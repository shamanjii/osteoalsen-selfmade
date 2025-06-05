<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analytics Dashboard - Blog CMS</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }

        .header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem 2rem;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .header h1 {
            color: #2d3748;
            font-size: 1.8rem;
            font-weight: 700;
        }

        .nav {
            margin-top: 1rem;
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .nav a {
            padding: 0.5rem 1rem;
            background: linear-gradient(135deg, #4299e1, #3182ce);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .nav a:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(66, 153, 225, 0.4);
        }

        .nav a.active {
            background: linear-gradient(135deg, #38a169, #2f855a);
        }

        .container {
            max-width: 1600px;
            margin: 2rem auto;
            padding: 0 2rem;
        }

        .analytics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        }

        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .card h3 {
            color: #2d3748;
            margin-bottom: 1.5rem;
            font-size: 1.3rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .card-icon {
            width: 24px;
            height: 24px;
            fill: #4299e1;
        }

        .wide-card {
            grid-column: 1 / -1;
        }

        .half-card {
            grid-column: span 2;
        }

        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .metric-card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
            border: 2px solid transparent;
            transition: all 0.3s ease;
        }

        .metric-card:hover {
            transform: translateY(-2px);
            border-color: #4299e1;
        }

        .metric-value {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #4299e1, #3182ce);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .metric-label {
            color: #718096;
            font-weight: 500;
            margin-bottom: 0.5rem;
        }

        .metric-change {
            font-size: 0.9rem;
            font-weight: 600;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            display: inline-block;
        }

        .change-positive {
            background: rgba(56, 161, 105, 0.1);
            color: #2f855a;
        }

        .change-negative {
            background: rgba(229, 62, 62, 0.1);
            color: #c53030;
        }

        .change-neutral {
            background: rgba(113, 128, 150, 0.1);
            color: #4a5568;
        }

        .chart-container {
            position: relative;
            height: 400px;
            margin-top: 1rem;
        }

        .chart-small {
            height: 250px;
        }

        .time-selector {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
        }

        .time-btn {
            padding: 0.5rem 1rem;
            border: 2px solid #e2e8f0;
            background: white;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .time-btn:hover {
            border-color: #4299e1;
            background: rgba(66, 153, 225, 0.05);
        }

        .time-btn.active {
            background: linear-gradient(135deg, #4299e1, #3182ce);
            color: white;
            border-color: transparent;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
        }

        .data-table th,
        .data-table td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }

        .data-table th {
            background: rgba(66, 153, 225, 0.05);
            font-weight: 600;
            color: #2d3748;
        }

        .data-table tr:hover {
            background: rgba(66, 153, 225, 0.02);
        }

        .keyword-rank {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-weight: 600;
            font-size: 0.8rem;
        }

        .rank-top10 {
            background: rgba(56, 161, 105, 0.1);
            color: #2f855a;
        }

        .rank-top50 {
            background: rgba(66, 153, 225, 0.1);
            color: #2c5282;
        }

        .rank-lower {
            background: rgba(237, 137, 54, 0.1);
            color: #dd6b20;
        }

        .page-performance {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }

        .performance-metric {
            text-align: center;
            padding: 1rem;
            background: rgba(247, 250, 252, 0.8);
            border-radius: 8px;
            border-left: 4px solid;
        }

        .perf-excellent { border-color: #38a169; }
        .perf-good { border-color: #3182ce; }
        .perf-fair { border-color: #ed8936; }
        .perf-poor { border-color: #e53e3e; }

        .performance-score {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 0.25rem;
        }

        .performance-label {
            font-size: 0.8rem;
            color: #718096;
        }

        .top-content {
            max-height: 300px;
            overflow-y: auto;
        }

        .content-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 0;
            border-bottom: 1px solid #f1f5f9;
        }

        .content-item:last-child {
            border-bottom: none;
        }

        .content-title {
            font-weight: 500;
            color: #2d3748;
            flex: 1;
            margin-right: 1rem;
        }

        .content-metric {
            background: linear-gradient(135deg, #4299e1, #3182ce);
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .conversion-funnel {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 1rem 0;
        }

        .funnel-stage {
            text-align: center;
            flex: 1;
            position: relative;
        }

        .funnel-stage:not(:last-child)::after {
            content: '→';
            position: absolute;
            right: -15px;
            top: 50%;
            transform: translateY(-50%);
            color: #718096;
            font-size: 1.2rem;
        }

        .funnel-number {
            font-size: 1.8rem;
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 0.25rem;
        }

        .funnel-label {
            font-size: 0.8rem;
            color: #718096;
        }

        .funnel-rate {
            font-size: 0.9rem;
            font-weight: 600;
            color: #4299e1;
            margin-top: 0.25rem;
        }

        .alert {
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        }

        .alert-success {
            background: rgba(56, 161, 105, 0.1);
            border: 1px solid rgba(56, 161, 105, 0.3);
            color: #2f855a;
        }

        .alert-warning {
            background: rgba(237, 137, 54, 0.1);
            border: 1px solid rgba(237, 137, 54, 0.3);
            color: #dd6b20;
        }

        .alert-info {
            background: rgba(66, 153, 225, 0.1);
            border: 1px solid rgba(66, 153, 225, 0.3);
            color: #2c5282;
        }

        .heatmap-preview {
            background: linear-gradient(45deg, 
                rgba(56, 161, 105, 0.1) 0%, 
                rgba(56, 161, 105, 0.3) 25%,
                rgba(237, 137, 54, 0.3) 50%,
                rgba(229, 62, 62, 0.3) 75%,
                rgba(229, 62, 62, 0.1) 100%);
            height: 200px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #2d3748;
            font-weight: 600;
            margin-top: 1rem;
        }

        .loading {
            text-align: center;
            padding: 2rem;
            color: #718096;
        }

        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #e2e8f0;
            border-top: 4px solid #4299e1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .btn {
            background: linear-gradient(135deg, #4299e1, #3182ce);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1rem;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(66, 153, 225, 0.4);
        }

        .btn-sm {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
        }

        .integration-status {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .integration-card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 8px;
            padding: 1rem;
            border-left: 4px solid;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .integration-connected { border-color: #38a169; }
        .integration-disconnected { border-color: #e53e3e; }
        .integration-pending { border-color: #ed8936; }

        .integration-icon {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
        }

        .icon-ga { background: #ea4335; }
        .icon-gsc { background: #4285f4; }
        .icon-gtm { background: #246fdb; }

        .integration-info h4 {
            margin: 0;
            font-size: 0.9rem;
            color: #2d3748;
        }

        .integration-status-text {
            font-size: 0.8rem;
            margin-top: 0.25rem;
        }

        .status-connected { color: #2f855a; }
        .status-disconnected { color: #c53030; }
        .status-pending { color: #dd6b20; }

        /* Mobile Navigation Enhancement */
        .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #007acc;
        }

        @media (max-width: 1200px) {
            .half-card {
                grid-column: span 1;
            }
        }

        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block;
            }
            
            .nav-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                z-index: 1000;
            }
            
            .nav-menu.mobile-open {
                display: flex;
                flex-direction: column;
                padding: 1rem;
            }
            
            .nav-menu li {
                margin: 0.5rem 0;
            }

            .container {
                padding: 0 1rem;
            }
            
            .analytics-grid {
                grid-template-columns: 1fr;
            }
            
            .metrics-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .conversion-funnel {
                flex-direction: column;
                gap: 1rem;
            }
            
            .funnel-stage:not(:last-child)::after {
                content: '↓';
                position: static;
                margin: 0.5rem 0;
            }
        }

        /* Notifications */
        .notification {
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 Analytics Dashboard</h1>
        <nav>
            <a href="../index.html" class="logo">
                <div class="logo-icon">OA</div>
                <div class="logo-text">
                    <div class="logo-title">Osteopathie Alsen</div>
                    <div class="logo-subtitle">CMS Dashboard</div>
                </div>
            </a>
            <ul class="nav-menu" id="navMenu">
                <li><a href="index.html">📊 Dashboard</a></li>
                <li><a href="editor.html">✏️ Editor</a></li>
                <li><a href="media.html">🖼️ Medien</a></li>
                <li><a href="seo.html">🔍 SEO-Tools</a></li>
                <li><a href="content-optimizer.html">🎯 Optimierer</a></li>
                <li><a href="automation.html">🤖 Automatisierung</a></li>
                <li><a href="performance.html">⚡ Performance</a></li>
                <li><a href="analytics.html" class="active">📈 Analytics</a></li>
                <li><a href="content-workflow.html">📝 Workflow</a></li>
                <li><a href="../index.html" class="nav-cta">🌐 Blog ansehen</a></li>
            </ul>
            <button class="mobile-menu-toggle" id="mobileMenuToggle">☰</button>
        </nav>
    </div>

    <div class="container">
        <!-- Integration Status -->
        <div class="integration-status">
            <div class="integration-card integration-connected">
                <div class="integration-icon icon-ga">GA4</div>
                <div class="integration-info">
                    <h4>Google Analytics 4</h4>
                    <div class="integration-status-text status-connected">✅ Verbunden</div>
                </div>
            </div>
            <div class="integration-card integration-connected">
                <div class="integration-icon icon-gsc">GSC</div>
                <div class="integration-info">
                    <h4>Search Console</h4>
                    <div class="integration-status-text status-connected">✅ Verbunden</div>
                </div>
            </div>
            <div class="integration-card integration-pending">
                <div class="integration-icon icon-gtm">GTM</div>
                <div class="integration-info">
                    <h4>Tag Manager</h4>
                    <div class="integration-status-text status-pending">⏳ Setup erforderlich</div>
                </div>
            </div>
        </div>

        <!-- Zeitraum-Selektor -->
        <div class="card">
            <div class="time-selector">
                <div class="time-btn active" onclick="changeTimeRange('7d')">7 Tage</div>
                <div class="time-btn" onclick="changeTimeRange('30d')">30 Tage</div>
                <div class="time-btn" onclick="changeTimeRange('90d')">90 Tage</div>
                <div class="time-btn" onclick="changeTimeRange('12m')">12 Monate</div>
            </div>
        </div>

        <!-- Key Metrics -->
        <div class="metrics-grid" id="key-metrics">
            <div class="metric-card">
                <div class="metric-value" id="total-users">24,567</div>
                <div class="metric-label">Besucher</div>
                <div class="metric-change change-positive">+12.4%</div>
            </div>
            <div class="metric-card">
                <div class="metric-value" id="page-views">89,234</div>
                <div class="metric-label">Seitenaufrufe</div>
                <div class="metric-change change-positive">+8.7%</div>
            </div>
            <div class="metric-card">
                <div class="metric-value" id="avg-session">3:42</div>
                <div class="metric-label">Sitzungsdauer</div>
                <div class="metric-change change-negative">-2.1%</div>
            </div>
            <div class="metric-card">
                <div class="metric-value" id="bounce-rate">32.4%</div>
                <div class="metric-label">Absprungrate</div>
                <div class="metric-change change-positive">-5.3%</div>
            </div>
            <div class="metric-card">
                <div class="metric-value" id="conversion-rate">2.8%</div>
                <div class="metric-label">Conversion Rate</div>
                <div class="metric-change change-positive">+0.4%</div>
            </div>
        </div>

        <div class="analytics-grid">
            <!-- Traffic Verlauf -->
            <div class="card half-card">
                <h3>
                    <svg class="card-icon" viewBox="0 0 24 24">
                        <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
                    </svg>
                    Traffic-Entwicklung
                </h3>
                <div class="chart-container">
                    <canvas id="traffic-chart"></canvas>
                </div>
            </div>

            <!-- Top Keywords -->
            <div class="card">
                <h3>
                    <svg class="card-icon" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                    Top Keywords
                </h3>
                <div class="top-content" id="top-keywords">
                    <div class="loading">
                        <div class="loading-spinner"></div>
                        Lade Keyword-Daten...
                    </div>
                </div>
            </div>

            <!-- Page Performance -->
            <div class="card">
                <h3>
                    <svg class="card-icon" viewBox="0 0 24 24">
                        <path d="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.65 6.35,20.04C5.96,20.43 5.35,20.43 4.96,20.04C3.68,18.76 2.78,17.2 2.35,15.47C2.12,14.58 2,13.65 2,12.72C2,7.95 5.91,4.04 10.69,4.04L12,3M12,8A5,5 0 0,1 17,13C17,13.04 17,13.08 17,13.12L19,12C19,12.32 19,12.66 19,13A7,7 0 0,1 12,20C10.75,20 9.55,19.71 8.47,19.2L9.77,17.5C10.5,17.8 11.2,18 12,18A5,5 0 0,0 17,13H12V8Z"/>
                    </svg>
                    Page Performance
                </h3>
                <div class="page-performance">
                    <div class="performance-metric perf-excellent">
                        <div class="performance-score" style="color: #38a169;">92</div>
                        <div class="performance-label">Performance</div>
                    </div>
                    <div class="performance-metric perf-good">
                        <div class="performance-score" style="color: #3182ce;">87</div>
                        <div class="performance-label">SEO</div>
                    </div>
                    <div class="performance-metric perf-fair">
                        <div class="performance-score" style="color: #ed8936;">76</div>
                        <div class="performance-label">Accessibility</div>
                    </div>
                    <div class="performance-metric perf-good">
                        <div class="performance-score" style="color: #3182ce;">84</div>
                        <div class="performance-label">Best Practices</div>
                    </div>
                </div>
                
                <div class="alert alert-info" style="margin-top: 1rem;">
                    <strong>Core Web Vitals:</strong> 2 von 3 Metriken bestanden. 
                    <a href="#" onclick="showDetailedPerformance()" style="color: #2c5282;">Details anzeigen</a>
                </div>
            </div>

            <!-- Top Content -->
            <div class="card">
                <h3>
                    <svg class="card-icon" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                    Beliebteste Inhalte
                </h3>
                <div class="top-content" id="top-content">
                    <!-- Wird dynamisch geladen -->
                </div>
            </div>

            <!-- Conversion Funnel -->
            <div class="card">
                <h3>
                    <svg class="card-icon" viewBox="0 0 24 24">
                        <path d="M2,2V4H6.5L8,8H22L20,12H10L8.5,8H4V6H2V2M7,18A2,2 0 0,0 9,20A2,2 0 0,0 11,18A2,2 0 0,0 9,16A2,2 0 0,0 7,18M17,18A2,2 0 0,0 19,20A2,2 0 0,0 21,18A2,2 0 0,0 19,16A2,2 0 0,0 17,18Z"/>
                    </svg>
                    Conversion Funnel
                </h3>
                <div class="conversion-funnel">
                    <div class="funnel-stage">
                        <div class="funnel-number">24,567</div>
                        <div class="funnel-label">Besucher</div>
                    </div>
                    <div class="funnel-stage">
                        <div class="funnel-number">8,234</div>
                        <div class="funnel-label">Engagement</div>
                        <div class="funnel-rate">33.5%</div>
                    </div>
                    <div class="funnel-stage">
                        <div class="funnel-number">1,456</div>
                        <div class="funnel-label">Leads</div>
                        <div class="funnel-rate">17.7%</div>
                    </div>
                    <div class="funnel-stage">
                        <div class="funnel-number">687</div>
                        <div class="funnel-label">Conversions</div>
                        <div class="funnel-rate">47.2%</div>
                    </div>
                </div>
            </div>

            <!-- Search Console Data -->
            <div class="card half-card">
                <h3>
                    <svg class="card-icon" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analytics Dashboard - Blog CMS</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }

        .header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem 2rem;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .header h1 {
            color: #2d3748;
            font-size: 1.8rem;
            font-weight: 700;
        }

        .nav {
            margin-top: 1rem;
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .nav a {
            padding: 0.5rem 1rem;
            background: linear-gradient(135deg, #4299e1, #3182ce);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .nav a:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(66, 153, 225, 0.4);
        }

        .nav a.active {
            background: linear-gradient(135deg, #38a169, #2f855a);
        }

        .container {
            max-width: 1600px;
            margin: 2rem auto;
            padding: 0 2rem;
        }

        .analytics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        }

        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .card h3 {
            color: #2d3748;
            margin-bottom: 1.5rem;
            font-size: 1.3rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .card-icon {
            width: 24px;
            height: 24px;
            fill: #4299e1;
        }

        .wide-card {
            grid-column: 1 / -1;
        }

        .half-card {
            grid-column: span 2;
        }

        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .metric-card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
            border: 2px solid transparent;
            transition: all 0.3s ease;
        }

        .metric-card:hover {
            transform: translateY(-2px);
            border-color: #4299e1;
        }

        .metric-value {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #4299e1, #3182ce);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .metric-label {
            color: #718096;
            font-weight: 500;
            margin-bottom: 0.5rem;
        }

        .metric-change {
            font-size: 0.9rem;
            font-weight: 600;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            display: inline-block;
        }

        .change-positive {
            background: rgba(56, 161, 105, 0.1);
            color: #2f855a;
        }

        .change-negative {
            background: rgba(229, 62, 62, 0.1);
            color: #c53030;
        }

        .change-neutral {
            background: rgba(113, 128, 150, 0.1);
            color: #4a5568;
        }

        .chart-container {
            position: relative;
            height: 400px;
            margin-top: 1rem;
        }

        .chart-small {
            height: 250px;
        }

        .time-selector {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
        }

        .time-btn {
            padding: 0.5rem 1rem;
            border: 2px solid #e2e8f0;
            background: white;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .time-btn:hover {
            border-color: #4299e1;
            background: rgba(66, 153, 225, 0.05);
        }

        .time-btn.active {
            background: linear-gradient(135deg, #4299e1, #3182ce);
            color: white;
            border-color: transparent;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
        }

        .data-table th,
        .data-table td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }

        .data-table th {
            background: rgba(66, 153, 225, 0.05);
            font-weight: 600;
            color: #2d3748;
        }

        .data-table tr:hover {
            background: rgba(66, 153, 225, 0.02);
        }

        .keyword-rank {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-weight: 600;
            font-size: 0.8rem;
        }

        .rank-top10 {
            background: rgba(56, 161, 105, 0.1);
            color: #2f855a;
        }

        .rank-top50 {
            background: rgba(66, 153, 225, 0.1);
            color: #2c5282;
        }

        .rank-lower {
            background: rgba(237, 137, 54, 0.1);
            color: #dd6b20;
        }

        .page-performance {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }

        .performance-metric {
            text-align: center;
            padding: 1rem;
            background: rgba(247, 250, 252, 0.8);
            border-radius: 8px;
            border-left: 4px solid;
        }

        .perf-excellent { border-color: #38a169; }
        .perf-good { border-color: #3182ce; }
        .perf-fair { border-color: #ed8936; }
        .perf-poor { border-color: #e53e3e; }

        .performance-score {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 0.25rem;
        }

        .performance-label {
            font-size: 0.8rem;
            color: #718096;
        }

        .top-content {
            max-height: 300px;
            overflow-y: auto;
        }

        .content-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 0;
            border-bottom: 1px solid #f1f5f9;
        }

        .content-item:last-child {
            border-bottom: none;
        }

        .content-title {
            font-weight: 500;
            color: #2d3748;
            flex: 1;
            margin-right: 1rem;
        }

        .content-metric {
            background: linear-gradient(135deg, #4299e1, #3182ce);
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .conversion-funnel {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 1rem 0;
        }

        .funnel-stage {
            text-align: center;
            flex: 1;
            position: relative;
        }

        .funnel-stage:not(:last-child)::after {
            content: '→';
            position: absolute;
            right: -15px;
            top: 50%;
            transform: translateY(-50%);
            color: #718096;
            font-size: 1.2rem;
        }

        .funnel-number {
            font-size: 1.8rem;
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 0.25rem;
        }

        .funnel-label {
            font-size: 0.8rem;
            color: #718096;
        }

        .funnel-rate {
            font-size: 0.9rem;
            font-weight: 600;
            color: #4299e1;
            margin-top: 0.25rem;
        }

        .alert {
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        }

        .alert-success {
            background: rgba(56, 161, 105, 0.1);
            border: 1px solid rgba(56, 161, 105, 0.3);
            color: #2f855a;
        }

        .alert-warning {
            background: rgba(237, 137, 54, 0.1);
            border: 1px solid rgba(237, 137, 54, 0.3);
            color: #dd6b20;
        }

        .alert-info {
            background: rgba(66, 153, 225, 0.1);
            border: 1px solid rgba(66, 153, 225, 0.3);
            color: #2c5282;
        }

        .heatmap-preview {
            background: linear-gradient(45deg, 
                rgba(56, 161, 105, 0.1) 0%, 
                rgba(56, 161, 105, 0.3) 25%,
                rgba(237, 137, 54, 0.3) 50%,
                rgba(229, 62, 62, 0.3) 75%,
                rgba(229, 62, 62, 0.1) 100%);
            height: 200px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #2d3748;
            font-weight: 600;
            margin-top: 1rem;
        }

        .loading {
            text-align: center;
            padding: 2rem;
            color: #718096;
        }

        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #e2e8f0;
            border-top: 4px solid #4299e1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .btn {
            background: linear-gradient(135deg, #4299e1, #3182ce);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1rem;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(66, 153, 225, 0.4);
        }

        .btn-sm {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
        }

        .integration-status {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .integration-card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 8px;
            padding: 1rem;
            border-left: 4px solid;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .integration-connected { border-color: #38a169; }
        .integration-disconnected { border-color: #e53e3e; }
        .integration-pending { border-color: #ed8936; }

        .integration-icon {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
        }

        .icon-ga { background: #ea4335; }
        .icon-gsc { background: #4285f4; }
        .icon-gtm { background: #246fdb; }

        .integration-info h4 {
            margin: 0;
            font-size: 0.9rem;
            color: #2d3748;
        }

        .integration-status-text {
            font-size: 0.8rem;
            margin-top: 0.25rem;
        }

        .status-connected { color: #2f855a; }
        .status-disconnected { color: #c53030; }
        .status-pending { color: #dd6b20; }

        /* Mobile Navigation Enhancement */
        .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #007acc;
        }

        @media (max-width: 1200px) {
            .half-card {
                grid-column: span 1;
            }
        }

        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block;
            }
            
            .nav-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                z-index: 1000;
            }
            
            .nav-menu.mobile-open {
                display: flex;
                flex-direction: column;
                padding: 1rem;
            }
            
            .nav-menu li {
                margin: 0.5rem 0;
            }

            .container {
                padding: 0 1rem;
            }
            
            .analytics-grid {
                grid-template-columns: 1fr;
            }
            
            .metrics-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .conversion-funnel {
                flex-direction: column;
                gap: 1rem;
            }
            
            .funnel-stage:not(:last-child)::after {
                content: '↓';
                position: static;
                margin: 0.5rem 0;
            }
        }

        /* Notifications */
        .notification {
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 Analytics Dashboard</h1>
        <nav>
            <a href="../index.html" class="logo">
                <div class="logo-icon">OA</div>
                <div class="logo-text">
                    <div class="logo-title">Osteopathie Alsen</div>
                    <div class="logo-subtitle">CMS Dashboard</div>
                </div>
            </a>
            <ul class="nav-menu" id="navMenu">
                <li><a href="index.html">📊 Dashboard</a></li>
                <li><a href="editor.html">✏️ Editor</a></li>
                <li><a href="media.html">🖼️ Medien</a></li>
                <li><a href="seo.html">🔍 SEO-Tools</a></li>
                <li><a href="content-optimizer.html">🎯 Optimierer</a></li>
                <li><a href="automation.html">🤖 Automatisierung</a></li>
                <li><a href="performance.html">⚡ Performance</a></li>
                <li><a href="analytics.html" class="active">📈 Analytics</a></li>
                <li><a href="content-workflow.html">📝 Workflow</a></li>
                <li><a href="../index.html" class="nav-cta">🌐 Blog ansehen</a></li>
            </ul>
            <button class="mobile-menu-toggle" id="mobileMenuToggle">☰</button>
        </nav>
    </div>

    <div class="container">
        <!-- Integration Status -->
        <div class="integration-status">
            <div class="integration-card integration-connected">
                <div class="integration-icon icon-ga">GA4</div>
                <div class="integration-info">
                    <h4>Google Analytics 4</h4>
                    <div class="integration-status-text status-connected">✅ Verbunden</div>
                </div>
            </div>
            <div class="integration-card integration-connected">
                <div class="integration-icon icon-gsc">GSC</div>
                <div class="integration-info">
                    <h4>Search Console</h4>
                    <div class="integration-status-text status-connected">✅ Verbunden</div>
                </div>
            </div>
            <div class="integration-card integration-pending">
                <div class="integration-icon icon-gtm">GTM</div>
                <div class="integration-info">
                    <h4>Tag Manager</h4>
                    <div class="integration-status-text status-pending">⏳ Setup erforderlich</div>
                </div>
            </div>
        </div>

        <!-- Zeitraum-Selektor -->
        <div class="card">
            <div class="time-selector">
                <div class="time-btn active" onclick="changeTimeRange('7d')">7 Tage</div>
                <div class="time-btn" onclick="changeTimeRange('30d')">30 Tage</div>
                <div class="time-btn" onclick="changeTimeRange('90d')">90 Tage</div>
                <div class="time-btn" onclick="changeTimeRange('12m')">12 Monate</div>
            </div>
        </div>

        <!-- Key Metrics -->
        <div class="metrics-grid" id="key-metrics">
            <div class="metric-card">
                <div class="metric-value" id="total-users">24,567</div>
                <div class="metric-label">Besucher</div>
                <div class="metric-change change-positive">+12.4%</div>
            </div>
            <div class="metric-card">
                <div class="metric-value" id="page-views">89,234</div>
                <div class="metric-label">Seitenaufrufe</div>
                <div class="metric-change change-positive">+8.7%</div>
            </div>
            <div class="metric-card">
                <div class="metric-value" id="avg-session">3:42</div>
                <div class="metric-label">Sitzungsdauer</div>
                <div class="metric-change change-negative">-2.1%</div>
            </div>
            <div class="metric-card">
                <div class="metric-value" id="bounce-rate">32.4%</div>
                <div class="metric-label">Absprungrate</div>
                <div class="metric-change change-positive">-5.3%</div>
            </div>
            <div class="metric-card">
                <div class="metric-value" id="conversion-rate">2.8%</div>
                <div class="metric-label">Conversion Rate</div>
                <div class="metric-change change-positive">+0.4%</div>
            </div>
        </div>

        <div class="analytics-grid">
            <!-- Traffic Verlauf -->
            <div class="card half-card">
                <h3>
                    <svg class="card-icon" viewBox="0 0 24 24">
                        <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
                    </svg>
                    Traffic-Entwicklung
                </h3>
                <div class="chart-container">
                    <canvas id="traffic-chart"></canvas>
                </div>
            </div>

            <!-- Top Keywords -->
            <div class="card">
                <h3>
                    <svg class="card-icon" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                    Top Keywords
                </h3>
                <div class="top-content" id="top-keywords">
                    <div class="loading">
                        <div class="loading-spinner"></div>
                        Lade Keyword-Daten...
                    </div>
                </div>
            </div>

            <!-- Page Performance -->
            <div class="card">
                <h3>
                    <svg class="card-icon" viewBox="0 0 24 24">
                        <path d="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.65 6.35,20.04C5.96,20.43 5.35,20.43 4.96,20.04C3.68,18.76 2.78,17.2 2.35,15.47C2.12,14.58 2,13.65 2,12.72C2,7.95 5.91,4.04 10.69,4.04L12,3M12,8A5,5 0 0,1 17,13C17,13.04 17,13.08 17,13.12L19,12C19,12.32 19,12.66 19,13A7,7 0 0,1 12,20C10.75,20 9.55,19.71 8.47,19.2L9.77,17.5C10.5,17.8 11.2,18 12,18A5,5 0 0,0 17,13H12V8Z"/>
                    </svg>
                    Page Performance
                </h3>
                <div class="page-performance">
                    <div class="performance-metric perf-excellent">
                        <div class="performance-score" style="color: #38a169;">92</div>
                        <div class="performance-label">Performance</div>
                    </div>
                    <div class="performance-metric perf-good">
                        <div class="performance-score" style="color: #3182ce;">87</div>
                        <div class="performance-label">SEO</div>
                    </div>
                    <div class="performance-metric perf-fair">
                        <div class="performance-score" style="color: #ed8936;">76</div>
                        <div class="performance-label">Accessibility</div>
                    </div>
                    <div class="performance-metric perf-good">
                        <div class="performance-score" style="color: #3182ce;">84</div>
                        <div class="performance-label">Best Practices</div>
                    </div>
                </div>
                
                <div class="alert alert-info" style="margin-top: 1rem;">
                    <strong>Core Web Vitals:</strong> 2 von 3 Metriken bestanden. 
                    <a href="#" onclick="showDetailedPerformance()" style="color: #2c5282;">Details anzeigen</a>
                </div>
            </div>

            <!-- Top Content -->
            <div class="card">
                <h3>
                    <svg class="card-icon" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                    Beliebteste Inhalte
                </h3>
                <div class="top-content" id="top-content">
                    <!-- Wird dynamisch geladen -->
                </div>
            </div>

            <!-- Conversion Funnel -->
            <div class="card">
                <h3>
                    <svg class="card-icon" viewBox="0 0 24 24">
                        <path d="M2,2V4H6.5L8,8H22L20,12H10L8.5,8H4V6H2V2M7,18A2,2 0 0,0 9,20A2,2 0 0,0 11,18A2,2 0 0,0 9,16A2,2 0 0,0 7,18M17,18A2,2 0 0,0 19,20A2,2 0 0,0 21,18A2,2 0 0,0 19,16A2,2 0 0,0 17,18Z"/>
                    </svg>
                    Conversion Funnel
                </h3>
                <div class="conversion-funnel">
                    <div class="funnel-stage">
                        <div class="funnel-number">24,567</div>
                        <div class="funnel-label">Besucher</div>
                    </div>
                    <div class="funnel-stage">
                        <div class="funnel-number">8,234</div>
                        <div class="funnel-label">Engagement</div>
                        <div class="funnel-rate">33.5%</div>
                    </div>
                    <div class="funnel-stage">
                        <div class="funnel-number">1,456</div>
                        <div class="funnel-label">Leads</div>
                        <div class="funnel-rate">17.7%</div>
                    </div>
                    <div class="funnel-stage">
                        <div class="funnel-number">687</div>
                        <div class="funnel-label">Conversions</div>
                        <div class="funnel-rate">47.2%</div>
                    </div>
                </div>
            </div>

            <!-- Search Console Data -->
            <div class="card half-card">
                <h3>
                    <svg class="card-icon" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,
<!-- SEO-Boost Core Scripts -->
<script src="../assets/js/seo-boost-state.js"></script>
<script src="../assets/js/seo-boost-api.js"></script>
<script src="../assets/js/navigation-master.js"></script>

<!-- Live-Update Initializer -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Navigation Master aktivieren
    if (typeof unifyNavigation === 'function') {
        unifyNavigation();
    }
    
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-open');
        });
    }
    
    // Live-Updates für diese Seite aktivieren
    if (window.SEOBoost) {
        document.addEventListener('seoBoostUpdate', function(event) {
            const { key, data } = event.detail;
            handleLiveUpdate(key, data);
        });
        
        // Initial data laden
        loadInitialData();
    }
    
    console.log('✅ SEO-Boost Admin-Core aktiviert');
});

// Live-Update Handler (seitenspezifisch überschreibbar)
function handleLiveUpdate(key, data) {
    switch(key) {
        case 'post_created':
            refreshPostsList();
            showNotification('Neuer Post erstellt: ' + data.post.title);
            break;
        case 'media_optimized':
            refreshMediaList();
            showNotification('Medium optimiert');
            break;
        case 'seo_analysis':
            updateSEOMetrics(data.analysis);
            break;
        case 'live_stats':
            updateDashboardStats(data);
            break;
    }
}

// Initial Data Loader (seitenspezifisch überschreibbar)
function loadInitialData() {
    // Override in seitenspezifischen Scripts
}

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styling
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function refreshPostsList() {
    console.log('📝 Posts-Liste wird aktualisiert...');
}

function refreshMediaList() {
    console.log('🖼️ Media-Liste wird aktualisiert...');
}

function updateSEOMetrics(analysis) {
    console.log('🔍 SEO-Metriken aktualisiert:', analysis);
}

function updateDashboardStats(stats) {
    console.log('📊 Dashboard-Stats aktualisiert:', stats);
}
</script>
<!-- SEO-Boost Core Scripts -->
<script src="../assets/js/seo-boost-state.js"></script>
<script src="../assets/js/seo-boost-api.js"></script>
<script src="../assets/js/navigation-master.js"></script>

<!-- Live-Update Initializer -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Navigation Master aktivieren
    if (typeof unifyNavigation === 'function') {
        unifyNavigation();
    }
    
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-open');
        });
    }
    
    // Live-Updates für diese Seite aktivieren
    if (window.SEOBoost) {
        document.addEventListener('seoBoostUpdate', function(event) {
            const { key, data } = event.detail;
            handleLiveUpdate(key, data);
        });
        
        // Initial data laden
        loadInitialData();
    }
    
    console.log('✅ SEO-Boost Admin-Core aktiviert');
});

// Live-Update Handler (seitenspezifisch überschreibbar)
function handleLiveUpdate(key, data) {
    switch(key) {
        case 'post_created':
            refreshPostsList();
            showNotification('Neuer Post erstellt: ' + data.post.title);
            break;
        case 'media_optimized':
            refreshMediaList();
            showNotification('Medium optimiert');
            break;
        case 'seo_analysis':
            updateSEOMetrics(data.analysis);
            break;
        case 'live_stats':
            updateDashboardStats(data);
            break;
    }
}

// Initial Data Loader (seitenspezifisch überschreibbar)
function loadInitialData() {
    // Override in seitenspezifischen Scripts
}

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styling
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function refreshPostsList() {
    console.log('📝 Posts-Liste wird aktualisiert...');
}

function refreshMediaList() {
    console.log('🖼️ Media-Liste wird aktualisiert...');
}

function updateSEOMetrics(analysis) {
    console.log('🔍 SEO-Metriken aktualisiert:', analysis);
}

function updateDashboardStats(stats) {
    console.log('📊 Dashboard-Stats aktualisiert:', stats);
}
</script>
<!-- SEO-Boost Core Scripts -->
<script src="../assets/js/seo-boost-state.js"></script>
<script src="../assets/js/seo-boost-api.js"></script>
<script src="../assets/js/navigation-master.js"></script>

<!-- Live-Update Initializer -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Navigation Master aktivieren
    if (typeof unifyNavigation === 'function') {
        unifyNavigation();
    }
    
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-open');
        });
    }
    
    // Live-Updates für diese Seite aktivieren
    if (window.SEOBoost) {
        document.addEventListener('seoBoostUpdate', function(event) {
            const { key, data } = event.detail;
            handleLiveUpdate(key, data);
        });
        
        // Initial data laden
        loadInitialData();
    }
    
    console.log('✅ SEO-Boost Admin-Core aktiviert');
});

// Live-Update Handler (seitenspezifisch überschreibbar)
function handleLiveUpdate(key, data) {
    switch(key) {
        case 'post_created':
            refreshPostsList();
            showNotification('Neuer Post erstellt: ' + data.post.title);
            break;
        case 'media_optimized':
            refreshMediaList();
            showNotification('Medium optimiert');
            break;
        case 'seo_analysis':
            updateSEOMetrics(data.analysis);
            break;
        case 'live_stats':
            updateDashboardStats(data);
            break;
    }
}

// Initial Data Loader (seitenspezifisch überschreibbar)
function loadInitialData() {
    // Override in seitenspezifischen Scripts
}

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styling
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function refreshPostsList() {
    console.log('📝 Posts-Liste wird aktualisiert...');
}

function refreshMediaList() {
    console.log('🖼️ Media-Liste wird aktualisiert...');
}

function updateSEOMetrics(analysis) {
    console.log('🔍 SEO-Metriken aktualisiert:', analysis);
}

function updateDashboardStats(stats) {
    console.log('📊 Dashboard-Stats aktualisiert:', stats);
}
</script>
<?php
/**
 * Posts API - CRUD Operations für Blog Posts
 * Integriert mit dem bestehenden SEO-System
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
    error_log("Posts API Error: $message in $file on line $line");
});

class PostsAPI {
    private $dataDir;
    private $postsFile;
    private $configFile;
    private $uploadsDir;
    
    public function __construct() {
        $this->dataDir = __DIR__ . '/../data/';
        $this->postsFile = $this->dataDir . 'posts.json';
        $this->configFile = $this->dataDir . 'config.json';
        $this->uploadsDir = __DIR__ . '/../uploads/';
        
        // Verzeichnisse erstellen falls nicht vorhanden
        $this->ensureDirectories();
    }
    
    private function ensureDirectories() {
        $dirs = [
            $this->dataDir,
            $this->uploadsDir,
            $this->uploadsDir . 'images/',
            $this->uploadsDir . 'thumbnails/',
            __DIR__ . '/../posts/'
        ];
        
        foreach ($dirs as $dir) {
            if (!file_exists($dir)) {
                mkdir($dir, 0755, true);
            }
        }
    }
    
    public function handleRequest() {
        try {
            $method = $_SERVER['REQUEST_METHOD'];
            $action = $_GET['action'] ?? $_POST['action'] ?? null;
            
            // POST Request mit JSON Body
            if ($method === 'POST' && !$action) {
                $input = json_decode(file_get_contents('php://input'), true);
                $action = $input['action'] ?? null;
                $_POST = array_merge($_POST, $input ?? []);
            }
            
            switch ($action) {
                case 'create':
                    return $this->createPost();
                case 'update':
                    return $this->updatePost();
                case 'delete':
                    return $this->deletePost();
                case 'get':
                    return $this->getPost();
                case 'list':
                    return $this->listPosts();
                case 'search':
                    return $this->searchPosts();
                default:
                    throw new Exception('Ungültige Aktion');
            }
            
        } catch (Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
    
    private function createPost() {
        $postData = $this->validatePostData($_POST['post'] ?? []);
        
        // ID generieren falls nicht vorhanden
        if (!isset($postData['id']) || empty($postData['id'])) {
            $postData['id'] = $this->generatePostId();
        }
        
        // Slug generieren falls nicht vorhanden
        if (!isset($postData['slug']) || empty($postData['slug'])) {
            $postData['slug'] = $this->generateSlug($postData['title']);
        }
        
        // Slug-Eindeutigkeit prüfen
        $postData['slug'] = $this->ensureUniqueSlug($postData['slug'], $postData['id']);
        
        // Timestamps setzen
        $postData['created_at'] = date('c');
        $postData['updated_at'] = date('c');
        
        // Post speichern
        $posts = $this->loadPosts();
        $posts[] = $postData;
        $this->savePosts($posts);
        
        // HTML-Datei generieren
        $this->generatePostHTML($postData);
        
        // SEO-Daten aktualisieren
        $this->updateSEOData($postData);
        
        return $this->sendSuccess('Post erfolgreich erstellt', [
            'post_id' => $postData['id'],
            'slug' => $postData['slug']
        ]);
    }
    
    private function updatePost() {
        $postData = $this->validatePostData($_POST['post'] ?? []);
        
        if (!isset($postData['id'])) {
            throw new Exception('Post-ID fehlt');
        }
        
        $posts = $this->loadPosts();
        $index = $this->findPostIndex($posts, $postData['id']);
        
        if ($index === false) {
            throw new Exception('Post nicht gefunden');
        }
        
        // Bestehende Daten mit neuen zusammenführen
        $existingPost = $posts[$index];
        $postData = array_merge($existingPost, $postData);
        $postData['updated_at'] = date('c');
        
        // Slug-Eindeutigkeit prüfen (außer für aktuellen Post)
        if ($postData['slug'] !== $existingPost['slug']) {
            $postData['slug'] = $this->ensureUniqueSlug($postData['slug'], $postData['id']);
        }
        
        // Post aktualisieren
        $posts[$index] = $postData;
        $this->savePosts($posts);
        
        // HTML-Datei aktualisieren
        $this->generatePostHTML($postData);
        
        // Alte HTML-Datei löschen falls Slug geändert
        if ($postData['slug'] !== $existingPost['slug']) {
            $oldFile = __DIR__ . '/../posts/' . $existingPost['slug'] . '.html';
            if (file_exists($oldFile)) {
                unlink($oldFile);
            }
        }
        
        // SEO-Daten aktualisieren
        $this->updateSEOData($postData);
        
        return $this->sendSuccess('Post erfolgreich aktualisiert', [
            'post_id' => $postData['id'],
            'slug' => $postData['slug']
        ]);
    }
    
    private function deletePost() {
        $postId = $_GET['id'] ?? $_POST['id'] ?? null;
        
        if (!$postId) {
            throw new Exception('Post-ID fehlt');
        }
        
        $posts = $this->loadPosts();
        $index = $this->findPostIndex($posts, $postId);
        
        if ($index === false) {
            throw new Exception('Post nicht gefunden');
        }
        
        $post = $posts[$index];
        
        // HTML-Datei löschen
        $htmlFile = __DIR__ . '/../posts/' . $post['slug'] . '.html';
        if (file_exists($htmlFile)) {
            unlink($htmlFile);
        }
        
        // Post aus Array entfernen
        array_splice($posts, $index, 1);
        $this->savePosts($posts);
        
        return $this->sendSuccess('Post erfolgreich gelöscht');
    }
    
    private function getPost() {
        $postId = $_GET['id'] ?? null;
        
        if (!$postId) {
            throw new Exception('Post-ID fehlt');
        }
        
        $posts = $this->loadPosts();
        $index = $this->findPostIndex($posts, $postId);
        
        if ($index === false) {
            throw new Exception('Post nicht gefunden');
        }
        
        return $this->sendSuccess('Post gefunden', ['post' => $posts[$index]]);
    }
    
    private function listPosts() {
        $posts = $this->loadPosts();
        $status = $_GET['status'] ?? 'all';
        $limit = (int)($_GET['limit'] ?? 10);
        $offset = (int)($_GET['offset'] ?? 0);
        $search = $_GET['search'] ?? '';
        
        // Status-Filter
        if ($status !== 'all') {
            $posts = array_filter($posts, function($post) use ($status) {
                return ($post['status'] ?? 'draft') === $status;
            });
        }
        
        // Such-Filter
        if (!empty($search)) {
            $posts = array_filter($posts, function($post) use ($search) {
                $searchLower = strtolower($search);
                return strpos(strtolower($post['title'] ?? ''), $searchLower) !== false ||
                       strpos(strtolower($post['content'] ?? ''), $searchLower) !== false ||
                       strpos(strtolower($post['excerpt'] ?? ''), $searchLower) !== false;
            });
        }
        
        // Sortieren (neueste zuerst)
        usort($posts, function($a, $b) {
            return strtotime($b['updated_at'] ?? 0) - strtotime($a['updated_at'] ?? 0);
        });
        
        $total = count($posts);
        
        // Pagination
        $posts = array_slice($posts, $offset, $limit);
        
        return $this->sendSuccess('Posts geladen', [
            'posts' => array_values($posts),
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset
        ]);
    }
    
    private function searchPosts() {
        $query = $_GET['q'] ?? '';
        $category = $_GET['category'] ?? '';
        $tags = $_GET['tags'] ?? '';
        
        if (empty($query)) {
            throw new Exception('Suchanfrage fehlt');
        }
        
        $posts = $this->loadPosts();
        $results = [];
        
        foreach ($posts as $post) {
            if (($post['status'] ?? 'draft') !== 'published') continue;
            
            $score = 0;
            $queryLower = strtolower($query);
            
            // Titel-Match (höchste Gewichtung)
            if (strpos(strtolower($post['title'] ?? ''), $queryLower) !== false) {
                $score += 10;
            }
            
            // Content-Match
            if (strpos(strtolower($post['content'] ?? ''), $queryLower) !== false) {
                $score += 5;
            }
            
            // Excerpt-Match
            if (strpos(strtolower($post['excerpt'] ?? ''), $queryLower) !== false) {
                $score += 3;
            }
            
            // Tag-Match
            if (isset($post['tags']) && is_array($post['tags'])) {
                foreach ($post['tags'] as $tag) {
                    if (strpos(strtolower($tag), $queryLower) !== false) {
                        $score += 2;
                    }
                }
            }
            
            // Kategorie-Filter
            if (!empty($category) && ($post['category'] ?? '') !== $category) {
                continue;
            }
            
            // Tag-Filter
            if (!empty($tags)) {
                $filterTags = explode(',', $tags);
                $postTags = $post['tags'] ?? [];
                if (!array_intersect($filterTags, $postTags)) {
                    continue;
                }
            }
            
            if ($score > 0) {
                $post['search_score'] = $score;
                $results[] = $post;
            }
        }
        
        // Nach Relevanz sortieren
        usort($results, function($a, $b) {
            return $b['search_score'] - $a['search_score'];
        });
        
        return $this->sendSuccess('Suchergebnisse', [
            'query' => $query,
            'results' => array_values($results),
            'total' => count($results)
        ]);
    }
    
    private function validatePostData($data) {
        $required = ['title'];
        
        foreach ($required as $field) {
            if (!isset($data[$field]) || empty(trim($data[$field]))) {
                throw new Exception("Feld '$field' ist erforderlich");
            }
        }
        
        // Datenbereinigung
        $cleaned = [
            'id' => $data['id'] ?? null,
            'title' => trim($data['title']),
            'slug' => trim($data['slug'] ?? ''),
            'excerpt' => trim($data['excerpt'] ?? ''),
            'content' => $data['content'] ?? '',
            'category' => trim($data['category'] ?? ''),
            'tags' => is_array($data['tags'] ?? null) ? $data['tags'] : explode(',', $data['tags'] ?? ''),
            'featured_image' => trim($data['featured_image'] ?? ''),
            'meta_title' => trim($data['meta_title'] ?? ''),
            'meta_description' => trim($data['meta_description'] ?? ''),
            'focus_keyword' => trim($data['focus_keyword'] ?? ''),
            'status' => in_array($data['status'] ?? 'draft', ['draft', 'published', 'scheduled']) ? $data['status'] : 'draft',
            'publish_date' => $data['publish_date'] ?? null,
            'created_at' => $data['created_at'] ?? null,
            'updated_at' => $data['updated_at'] ?? null
        ];
        
        // Tags bereinigen
        $cleaned['tags'] = array_filter(array_map('trim', $cleaned['tags']));
        
        return $cleaned;
    }
    
    private function generatePostHTML($post) {
        // Bestehende generate-post.php nutzen
        $generateScript = __DIR__ . '/../generate-post.php';
        
        if (!file_exists($generateScript)) {
            throw new Exception('HTML-Generator nicht gefunden');
        }
        
        // Temporäre Post-Datei erstellen
        $tempFile = sys_get_temp_dir() . '/post_' . $post['id'] . '.json';
        file_put_contents($tempFile, json_encode($post, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        
        // Generator ausführen
        $command = "php " . escapeshellarg($generateScript) . " " . escapeshellarg($tempFile);
        exec($command . " 2>&1", $output, $returnCode);
        
        // Temp-Datei löschen
        unlink($tempFile);
        
        if ($returnCode !== 0) {
            error_log("HTML Generation failed: " . implode("\n", $output));
            throw new Exception('HTML-Generierung fehlgeschlagen');
        }
    }
    
    private function updateSEOData($post) {
        // SEO-API aufrufen für Sitemap-Update etc.
        $seoAPI = __DIR__ . '/seo.php';
        
        if (file_exists($seoAPI)) {
            // Sitemap regenerieren
            $context = stream_context_create([
                'http' => [
                    'method' => 'POST',
                    'header' => 'Content-Type: application/json',
                    'content' => json_encode(['action' => 'update_sitemap'])
                ]
            ]);
            
            @file_get_contents($seoAPI, false, $context);
        }
    }
    
    private function loadPosts() {
        if (!file_exists($this->postsFile)) {
            return [];
        }
        
        $content = file_get_contents($this->postsFile);
        $posts = json_decode($content, true);
        
        return is_array($posts) ? $posts : [];
    }
    
    private function savePosts($posts) {
        $content = json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        
        if (file_put_contents($this->postsFile, $content) === false) {
            throw new Exception('Fehler beim Speichern der Posts');
        }
    }
    
    private function findPostIndex($posts, $id) {
        foreach ($posts as $index => $post) {
            if (($post['id'] ?? null) === $id) {
                return $index;
            }
        }
        return false;
    }
    
    private function generatePostId() {
        return date('Y-m-d-H-i-s') . '-' . substr(md5(uniqid()), 0, 8);
    }
    
    private function generateSlug($title) {
        $slug = strtolower(trim($title));
        
        // Deutsche Umlaute ersetzen
        $slug = str_replace(['ä', 'ö', 'ü', 'ß'], ['ae', 'oe', 'ue', 'ss'], $slug);
        
        // Nur Buchstaben, Zahlen und Bindestriche
        $slug = preg_replace('/[^a-z0-9\s\-]/', '', $slug);
        $slug = preg_replace('/[\s\-]+/', '-', $slug);
        $slug = trim($slug, '-');
        
        return $slug ?: 'post-' . time();
    }
    
    private function ensureUniqueSlug($slug, $currentId = null) {
        $posts = $this->loadPosts();
        $originalSlug = $slug;
        $counter = 1;
        
        do {
            $exists = false;
            foreach ($posts as $post) {
                if (($post['slug'] ?? '') === $slug && ($post['id'] ?? '') !== $currentId) {
                    $exists = true;
                    break;
                }
            }
            
            if ($exists) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }
        } while ($exists);
        
        return $slug;
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
    $api = new PostsAPI();
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