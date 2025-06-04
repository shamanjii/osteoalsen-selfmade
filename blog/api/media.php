<?php
/**
 * Media API - Upload, Optimierung und Verwaltung von Bildern
 * Automatische WebP-Konvertierung, Thumbnail-Generierung und SEO-Optimierung
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Error Handling
set_error_handler(function($severity, $message, $file, $line) {
    error_log("Media API Error: $message in $file on line $line");
});

class MediaAPI {
    private $uploadsDir;
    private $thumbnailsDir;
    private $dataDir;
    private $mediaFile;
    private $allowedTypes;
    private $maxFileSize;
    
    public function __construct() {
        $this->uploadsDir = __DIR__ . '/../uploads/images/';
        $this->thumbnailsDir = __DIR__ . '/../uploads/thumbnails/';
        $this->dataDir = __DIR__ . '/../data/';
        $this->mediaFile = $this->dataDir . 'media.json';
        
        $this->allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        $this->maxFileSize = 10 * 1024 * 1024; // 10MB
        
        $this->ensureDirectories();
    }
    
    private function ensureDirectories() {
        $dirs = [
            $this->uploadsDir,
            $this->thumbnailsDir,
            $this->dataDir
        ];
        
        foreach ($dirs as $dir) {
            if (!file_exists($dir)) {
                mkdir($dir, 0755, true);
            }
        }
        
        // .htaccess für Uploads erstellen
        $this->createUploadsHtaccess();
    }
    
    private function createUploadsHtaccess() {
        $htaccessFile = dirname($this->uploadsDir) . '/.htaccess';
        
        if (!file_exists($htaccessFile)) {
            $htaccessContent = "# Schutz vor direktem Zugriff auf PHP-Dateien\n";
            $htaccessContent .= "<Files *.php>\n";
            $htaccessContent .= "    Order allow,deny\n";
            $htaccessContent .= "    Deny from all\n";
            $htaccessContent .= "</Files>\n\n";
            
            $htaccessContent .= "# Bildoptimierung\n";
            $htaccessContent .= "<IfModule mod_expires.c>\n";
            $htaccessContent .= "    ExpiresActive On\n";
            $htaccessContent .= "    ExpiresByType image/jpg \"access plus 1 year\"\n";
            $htaccessContent .= "    ExpiresByType image/jpeg \"access plus 1 year\"\n";
            $htaccessContent .= "    ExpiresByType image/gif \"access plus 1 year\"\n";
            $htaccessContent .= "    ExpiresByType image/png \"access plus 1 year\"\n";
            $htaccessContent .= "    ExpiresByType image/webp \"access plus 1 year\"\n";
            $htaccessContent .= "</IfModule>\n\n";
            
            $htaccessContent .= "# Gzip Komprimierung\n";
            $htaccessContent .= "<IfModule mod_deflate.c>\n";
            $htaccessContent .= "    AddOutputFilterByType DEFLATE image/svg+xml\n";
            $htaccessContent .= "</IfModule>\n";
            
            file_put_contents($htaccessFile, $htaccessContent);
        }
    }
    
    public function handleRequest() {
        try {
            $action = $_GET['action'] ?? $_POST['action'] ?? null;
            
            // POST Request mit JSON Body
            if ($_SERVER['REQUEST_METHOD'] === 'POST' && !$action && !isset($_FILES['file'])) {
                $input = json_decode(file_get_contents('php://input'), true);
                $action = $input['action'] ?? null;
                $_POST = array_merge($_POST, $input ?? []);
            }
            
            switch ($action) {
                case 'upload':
                    return $this->uploadImage();
                case 'list':
                    return $this->listMedia();
                case 'get':
                    return $this->getMedia();
                case 'update':
                    return $this->updateMedia();
                case 'delete':
                    return $this->deleteMedia();
                case 'bulk_delete':
                    return $this->bulkDeleteMedia();
                case 'bulk_update_alt':
                    return $this->bulkUpdateAlt();
                case 'optimize':
                    return $this->optimizeImage();
                case 'generate_thumbnails':
                    return $this->generateThumbnails();
                default:
                    throw new Exception('Ungültige Aktion');
            }
            
        } catch (Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
    
    private function uploadImage() {
        if (!isset($_FILES['file'])) {
            throw new Exception('Keine Datei hochgeladen');
        }
        
        $file = $_FILES['file'];
        
        // Validierung
        $this->validateUpload($file);
        
        // Unique filename generieren
        $originalName = pathinfo($file['name'], PATHINFO_FILENAME);
        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $uniqueName = $this->generateUniqueFilename($originalName, $extension);
        
        // Bildinfos ermitteln
        $imageInfo = getimagesize($file['tmp_name']);
        if (!$imageInfo) {
            throw new Exception('Ungültiges Bildformat');
        }
        
        $width = $imageInfo[0];
        $height = $imageInfo[1];
        $mimeType = $imageInfo['mime'];
        
        // Optimierte Version erstellen
        $optimizedPath = $this->uploadsDir . $uniqueName;
        $thumbnailPath = $this->thumbnailsDir . $uniqueName;
        
        // Bild optimieren und speichern
        $this->processAndSaveImage($file['tmp_name'], $optimizedPath, $mimeType, $width, $height);
        
        // Thumbnail erstellen
        $this->createThumbnail($optimizedPath, $thumbnailPath, $mimeType);
        
        // WebP-Version erstellen (falls unterstützt)
        $webpPath = null;
        $webpThumbnailPath = null;
        if ($this->supportsWebP()) {
            $webpName = pathinfo($uniqueName, PATHINFO_FILENAME) . '.webp';
            $webpPath = $this->uploadsDir . $webpName;
            $webpThumbnailPath = $this->thumbnailsDir . $webpName;
            
            $this->createWebPVersion($optimizedPath, $webpPath);
            $this->createWebPVersion($thumbnailPath, $webpThumbnailPath);
        }
        
        // Media-Eintrag erstellen
        $mediaData = [
            'id' => $this->generateMediaId(),
            'name' => $originalName . '.' . $extension,
            'filename' => $uniqueName,
            'type' => $mimeType,
            'size' => filesize($optimizedPath),
            'dimensions' => $width . 'x' . $height,
            'width' => $width,
            'height' => $height,
            'url' => $this->getBaseUrl() . 'uploads/images/' . $uniqueName,
            'thumbnail_url' => $this->getBaseUrl() . 'uploads/thumbnails/' . $uniqueName,
            'webp_url' => $webpPath ? $this->getBaseUrl() . 'uploads/images/' . $webpName : null,
            'webp_thumbnail_url' => $webpThumbnailPath ? $this->getBaseUrl() . 'uploads/thumbnails/' . $webpName : null,
            'alt_text' => '',
            'title' => '',
            'caption' => '',
            'uploaded_at' => date('c'),
            'file_hash' => md5_file($optimizedPath)
        ];
        
        // In Datenbank speichern
        $this->saveMediaData($mediaData);
        
        return $this->sendSuccess('Bild erfolgreich hochgeladen', [
            'media' => $mediaData
        ]);
    }
    
    private function validateUpload($file) {
        // Upload-Fehler prüfen
        if ($file['error'] !== UPLOAD_ERR_OK) {
            switch ($file['error']) {
                case UPLOAD_ERR_INI_SIZE:
                case UPLOAD_ERR_FORM_SIZE:
                    throw new Exception('Datei zu groß');
                case UPLOAD_ERR_PARTIAL:
                    throw new Exception('Upload unvollständig');
                case UPLOAD_ERR_NO_FILE:
                    throw new Exception('Keine Datei ausgewählt');
                default:
                    throw new Exception('Upload-Fehler');
            }
        }
        
        // Dateigröße prüfen
        if ($file['size'] > $this->maxFileSize) {
            throw new Exception('Datei zu groß (max. ' . $this->formatFileSize($this->maxFileSize) . ')');
        }
        
        // MIME-Type prüfen
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);
        
        if (!in_array($mimeType, $this->allowedTypes)) {
            throw new Exception('Dateityp nicht erlaubt');
        }
        
        // Bildvalidierung
        $imageInfo = getimagesize($file['tmp_name']);
        if (!$imageInfo) {
            throw new Exception('Keine gültige Bilddatei');
        }
    }
    
    private function processAndSaveImage($sourcePath, $targetPath, $mimeType, $width, $height) {
        // Maximale Bildgröße (für Web optimiert)
        $maxWidth = 1920;
        $maxHeight = 1080;
        $quality = 85;
        
        // Berechne neue Dimensionen falls nötig
        $newWidth = $width;
        $newHeight = $height;
        
        if ($width > $maxWidth || $height > $maxHeight) {
            $ratio = min($maxWidth / $width, $maxHeight / $height);
            $newWidth = round($width * $ratio);
            $newHeight = round($height * $ratio);
        }
        
        // Bild laden
        $sourceImage = $this->createImageResource($sourcePath, $mimeType);
        if (!$sourceImage) {
            throw new Exception('Bild konnte nicht geladen werden');
        }
        
        // Neues Bild erstellen falls Resize nötig
        if ($newWidth !== $width || $newHeight !== $height) {
            $targetImage = imagecreatetruecolor($newWidth, $newHeight);
            
            // Transparenz für PNG/GIF erhalten
            if ($mimeType === 'image/png' || $mimeType === 'image/gif') {
                imagealphablending($targetImage, false);
                imagesavealpha($targetImage, true);
                $transparent = imagecolorallocatealpha($targetImage, 255, 255, 255, 127);
                imagefill($targetImage, 0, 0, $transparent);
            }
            
            // Resize mit hoher Qualität
            imagecopyresampled($targetImage, $sourceImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
            imagedestroy($sourceImage);
            $sourceImage = $targetImage;
        }
        
        // Bild speichern
        $this->saveImageResource($sourceImage, $targetPath, $mimeType, $quality);
        imagedestroy($sourceImage);
    }
    
    private function createThumbnail($sourcePath, $targetPath, $mimeType) {
        $thumbWidth = 300;
        $thumbHeight = 300;
        $quality = 80;
        
        $imageInfo = getimagesize($sourcePath);
        if (!$imageInfo) return;
        
        $width = $imageInfo[0];
        $height = $imageInfo[1];
        
        // Berechne Thumbnail-Dimensionen (quadratisch, zentriert)
        $size = min($width, $height);
        $x = ($width - $size) / 2;
        $y = ($height - $size) / 2;
        
        // Bilder laden
        $sourceImage = $this->createImageResource($sourcePath, $mimeType);
        if (!$sourceImage) return;
        
        $thumbImage = imagecreatetruecolor($thumbWidth, $thumbHeight);
        
        // Transparenz erhalten
        if ($mimeType === 'image/png' || $mimeType === 'image/gif') {
            imagealphablending($thumbImage, false);
            imagesavealpha($thumbImage, true);
            $transparent = imagecolorallocatealpha($thumbImage, 255, 255, 255, 127);
            imagefill($thumbImage, 0, 0, $transparent);
        }
        
        // Thumbnail erstellen
        imagecopyresampled($thumbImage, $sourceImage, 0, 0, $x, $y, $thumbWidth, $thumbHeight, $size, $size);
        
        // Speichern
        $this->saveImageResource($thumbImage, $targetPath, $mimeType, $quality);
        
        imagedestroy($sourceImage);
        imagedestroy($thumbImage);
    }
    
    private function createWebPVersion($sourcePath, $targetPath) {
        if (!function_exists('imagewebp')) return false;
        
        $imageInfo = getimagesize($sourcePath);
        if (!$imageInfo) return false;
        
        $sourceImage = $this->createImageResource($sourcePath, $imageInfo['mime']);
        if (!$sourceImage) return false;
        
        // WebP mit hoher Qualität erstellen
        $result = imagewebp($sourceImage, $targetPath, 85);
        imagedestroy($sourceImage);
        
        return $result;
    }
    
    private function createImageResource($path, $mimeType) {
        switch ($mimeType) {
            case 'image/jpeg':
                return imagecreatefromjpeg($path);
            case 'image/png':
                return imagecreatefrompng($path);
            case 'image/gif':
                return imagecreatefromgif($path);
            case 'image/webp':
                return function_exists('imagecreatefromwebp') ? imagecreatefromwebp($path) : false;
            default:
                return false;
        }
    }
    
    private function saveImageResource($image, $path, $mimeType, $quality) {
        switch ($mimeType) {
            case 'image/jpeg':
                return imagejpeg($image, $path, $quality);
            case 'image/png':
                // PNG Qualität: 0-9 (0 = keine Kompression, 9 = max Kompression)
                $pngQuality = round((100 - $quality) / 10);
                return imagepng($image, $path, $pngQuality);
            case 'image/gif':
                return imagegif($image, $path);
            case 'image/webp':
                return function_exists('imagewebp') ? imagewebp($image, $path, $quality) : false;
            default:
                return false;
        }
    }
    
    private function listMedia() {
        $search = $_GET['search'] ?? '';
        $type = $_GET['type'] ?? 'all';
        $limit = (int)($_GET['limit'] ?? 50);
        $offset = (int)($_GET['offset'] ?? 0);
        
        $allMedia = $this->loadMediaData();
        
        // Filter anwenden
        $filteredMedia = array_filter($allMedia, function($media) use ($search, $type) {
            // Such-Filter
            if (!empty($search)) {
                $searchLower = strtolower($search);
                $matchesSearch = strpos(strtolower($media['name'] ?? ''), $searchLower) !== false ||
                               strpos(strtolower($media['alt_text'] ?? ''), $searchLower) !== false ||
                               strpos(strtolower($media['title'] ?? ''), $searchLower) !== false;
                if (!$matchesSearch) return false;
            }
            
            // Typ-Filter
            if ($type !== 'all') {
                $mediaType = strtolower(pathinfo($media['name'] ?? '', PATHINFO_EXTENSION));
                if ($mediaType !== $type) return false;
            }
            
            return true;
        });
        
        // Sortieren (neueste zuerst)
        usort($filteredMedia, function($a, $b) {
            return strtotime($b['uploaded_at'] ?? 0) - strtotime($a['uploaded_at'] ?? 0);
        });
        
        $total = count($filteredMedia);
        
        // Pagination
        $pageMedia = array_slice($filteredMedia, $offset, $limit);
        
        return $this->sendSuccess('Medien geladen', [
            'media' => array_values($pageMedia),
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset
        ]);
    }
    
    private function getMedia() {
        $mediaId = $_GET['id'] ?? null;
        
        if (!$mediaId) {
            throw new Exception('Media-ID fehlt');
        }
        
        $allMedia = $this->loadMediaData();
        $media = $this->findMediaById($allMedia, $mediaId);
        
        if (!$media) {
            throw new Exception('Medium nicht gefunden');
        }
        
        return $this->sendSuccess('Medium gefunden', ['media' => $media]);
    }
    
    private function updateMedia() {
        $mediaData = $_POST['media'] ?? [];
        
        if (!isset($mediaData['id'])) {
            throw new Exception('Media-ID fehlt');
        }
        
        $allMedia = $this->loadMediaData();
        $index = $this->findMediaIndex($allMedia, $mediaData['id']);
        
        if ($index === false) {
            throw new Exception('Medium nicht gefunden');
        }
        
        // Erlaubte Felder für Update
        $allowedFields = ['name', 'alt_text', 'title', 'caption'];
        
        foreach ($allowedFields as $field) {
            if (isset($mediaData[$field])) {
                $allMedia[$index][$field] = trim($mediaData[$field]);
            }
        }
        
        $allMedia[$index]['updated_at'] = date('c');
        
        $this->saveAllMediaData($allMedia);
        
        return $this->sendSuccess('Medium aktualisiert', ['media' => $allMedia[$index]]);
    }
    
    private function deleteMedia() {
        $mediaId = $_GET['id'] ?? $_POST['id'] ?? null;
        
        if (!$mediaId) {
            throw new Exception('Media-ID fehlt');
        }
        
        $allMedia = $this->loadMediaData();
        $index = $this->findMediaIndex($allMedia, $mediaId);
        
        if ($index === false) {
            throw new Exception('Medium nicht gefunden');
        }
        
        $media = $allMedia[$index];
        
        // Dateien löschen
        $this->deleteMediaFiles($media);
        
        // Aus Array entfernen
        array_splice($allMedia, $index, 1);
        $this->saveAllMediaData($allMedia);
        
        return $this->sendSuccess('Medium gelöscht');
    }
    
    private function bulkDeleteMedia() {
        $mediaIds = $_POST['ids'] ?? [];
        
        if (empty($mediaIds) || !is_array($mediaIds)) {
            throw new Exception('Keine Media-IDs angegeben');
        }
        
        $allMedia = $this->loadMediaData();
        $deletedCount = 0;
        
        // Rückwärts iterieren um Index-Probleme zu vermeiden
        for ($i = count($allMedia) - 1; $i >= 0; $i--) {
            if (in_array($allMedia[$i]['id'], $mediaIds)) {
                $this->deleteMediaFiles($allMedia[$i]);
                array_splice($allMedia, $i, 1);
                $deletedCount++;
            }
        }
        
        $this->saveAllMediaData($allMedia);
        
        return $this->sendSuccess("$deletedCount Medien gelöscht");
    }
    
    private function bulkUpdateAlt() {
        $mediaIds = $_POST['ids'] ?? [];
        $altText = $_POST['alt_text'] ?? '';
        
        if (empty($mediaIds) || !is_array($mediaIds)) {
            throw new Exception('Keine Media-IDs angegeben');
        }
        
        $allMedia = $this->loadMediaData();
        $updatedCount = 0;
        
        foreach ($allMedia as &$media) {
            if (in_array($media['id'], $mediaIds)) {
                $media['alt_text'] = trim($altText);
                $media['updated_at'] = date('c');
                $updatedCount++;
            }
        }
        
        $this->saveAllMediaData($allMedia);
        
        return $this->sendSuccess("Alt-Text für $updatedCount Medien aktualisiert");
    }
    
    private function optimizeImage() {
        $mediaId = $_POST['id'] ?? null;
        
        if (!$mediaId) {
            throw new Exception('Media-ID fehlt');
        }
        
        $allMedia = $this->loadMediaData();
        $media = $this->findMediaById($allMedia, $mediaId);
        
        if (!$media) {
            throw new Exception('Medium nicht gefunden');
        }
        
        $imagePath = $this->uploadsDir . $media['filename'];
        
        if (!file_exists($imagePath)) {
            throw new Exception('Bilddatei nicht gefunden');
        }
        
        // Backup des Originals
        $backupPath = $imagePath . '.backup';
        copy($imagePath, $backupPath);
        
        try {
            // Bild neu optimieren
            $imageInfo = getimagesize($imagePath);
            $this->processAndSaveImage($backupPath, $imagePath, $imageInfo['mime'], $imageInfo[0], $imageInfo[1]);
            
            // Thumbnail neu erstellen
            $thumbnailPath = $this->thumbnailsDir . $media['filename'];
            $this->createThumbnail($imagePath, $thumbnailPath, $imageInfo['mime']);
            
            // WebP-Version neu erstellen
            if ($this->supportsWebP()) {
                $webpName = pathinfo($media['filename'], PATHINFO_FILENAME) . '.webp';
                $webpPath = $this->uploadsDir . $webpName;
                $webpThumbnailPath = $this->thumbnailsDir . $webpName;
                
                $this->createWebPVersion($imagePath, $webpPath);
                $this->createWebPVersion($thumbnailPath, $webpThumbnailPath);
            }
            
            // Backup löschen
            unlink($backupPath);
            
            return $this->sendSuccess('Bild optimiert');
            
        } catch (Exception $e) {
            // Backup wiederherstellen
            if (file_exists($backupPath)) {
                copy($backupPath, $imagePath);
                unlink($backupPath);
            }
            throw $e;
        }
    }
    
    private function generateThumbnails() {
        $allMedia = $this->loadMediaData();
        $regeneratedCount = 0;
        
        foreach ($allMedia as $media) {
            $imagePath = $this->uploadsDir . $media['filename'];
            $thumbnailPath = $this->thumbnailsDir . $media['filename'];
            
            if (file_exists($imagePath)) {
                $imageInfo = getimagesize($imagePath);
                if ($imageInfo) {
                    $this->createThumbnail($imagePath, $thumbnailPath, $imageInfo['mime']);
                    $regeneratedCount++;
                }
            }
        }
        
        return $this->sendSuccess("$regeneratedCount Thumbnails regeneriert");
    }
    
    private function deleteMediaFiles($media) {
        $files = [
            $this->uploadsDir . $media['filename'],
            $this->thumbnailsDir . $media['filename']
        ];
        
        // WebP-Versionen
        if (isset($media['webp_url'])) {
            $webpName = pathinfo($media['filename'], PATHINFO_FILENAME) . '.webp';
            $files[] = $this->uploadsDir . $webpName;
            $files[] = $this->thumbnailsDir . $webpName;
        }
        
        foreach ($files as $file) {
            if (file_exists($file)) {
                unlink($file);
            }
        }
    }
    
    private function generateUniqueFilename($name, $extension) {
        $slug = $this->createSlug($name);
        $baseFilename = $slug . '.' . $extension;
        $filename = $baseFilename;
        $counter = 1;
        
        while (file_exists($this->uploadsDir . $filename)) {
            $filename = $slug . '-' . $counter . '.' . $extension;
            $counter++;
        }
        
        return $filename;
    }
    
    private function createSlug($text) {
        // Deutsche Umlaute ersetzen
        $text = str_replace(['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'], 
                          ['ae', 'oe', 'ue', 'ss', 'Ae', 'Oe', 'Ue'], $text);
        
        // Nur Buchstaben, Zahlen und Bindestriche
        $text = preg_replace('/[^a-zA-Z0-9\s\-_]/', '', $text);
        $text = preg_replace('/[\s\-_]+/', '-', $text);
        $text = trim($text, '-');
        $text = strtolower($text);
        
        return $text ?: 'image-' . time();
    }
    
    private function generateMediaId() {
        return 'media_' . date('Y-m-d-H-i-s') . '_' . substr(md5(uniqid()), 0, 8);
    }
    
    private function loadMediaData() {
        if (!file_exists($this->mediaFile)) {
            return [];
        }
        
        $content = file_get_contents($this->mediaFile);
        $media = json_decode($content, true);
        
        return is_array($media) ? $media : [];
    }
    
    private function saveMediaData($mediaData) {
        $allMedia = $this->loadMediaData();
        $allMedia[] = $mediaData;
        $this->saveAllMediaData($allMedia);
    }
    
    private function saveAllMediaData($mediaArray) {
        $content = json_encode($mediaArray, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        
        if (file_put_contents($this->mediaFile, $content) === false) {
            throw new Exception('Fehler beim Speichern der Media-Daten');
        }
    }
    
    private function findMediaById($mediaArray, $id) {
        foreach ($mediaArray as $media) {
            if (($media['id'] ?? null) === $id) {
                return $media;
            }
        }
        return null;
    }
    
    private function findMediaIndex($mediaArray, $id) {
        foreach ($mediaArray as $index => $media) {
            if (($media['id'] ?? null) === $id) {
                return $index;
            }
        }
        return false;
    }
    
    private function supportsWebP() {
        return function_exists('imagewebp') && function_exists('imagecreatefromwebp');
    }
    
    private function getBaseUrl() {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
        $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
        $scriptName = $_SERVER['SCRIPT_NAME'] ?? '';
        $basePath = dirname(dirname($scriptName));
        
        if ($basePath === '/') $basePath = '';
        
        return $protocol . $host . $basePath . '/';
    }
    
    private function formatFileSize($bytes) {
        if ($bytes === 0) return '0 Bytes';
        $k = 1024;
        $sizes = ['Bytes', 'KB', 'MB', 'GB'];
        $i = floor(log($bytes) / log($k));
        return round($bytes / pow($k, $i), 2) . ' ' . $sizes[$i];
    }
    
    private function sendSuccess($message, $data = []) {
        return [
            'success' => true,
            'message' => $message,
            'data' => $data,
            'timestamp' => date('c')
        ];
    }
    
    private function sendError($message, $code = 400) {
        http_response_code($code);
        return [
            'success' => false,
            'error' => $message,
            'timestamp' => date('c')
        ];
    }
}

// API ausführen
try {
    $api = new MediaAPI();
    $result = $api->handleRequest();
    echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Interner Serverfehler: ' . $e->getMessage(),
        'timestamp' => date('c')
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}
?>