#!/usr/bin/env tsx
import { getAllPosts } from '../src/lib/posts';
import { detectCluster } from '../src/lib/cluster-detection';

async function analyzeClusters() {
  const posts = await getAllPosts();

  const clusterCounts: Record<string, number> = {};
  const clusterPosts: Record<string, string[]> = {};

  posts.forEach(post => {
    const cluster = detectCluster({
      title: post.title,
      excerpt: post.excerpt,
      keywords: post.keywords
    });

    clusterCounts[cluster] = (clusterCounts[cluster] || 0) + 1;

    if (!clusterPosts[cluster]) {
      clusterPosts[cluster] = [];
    }
    clusterPosts[cluster].push(post.title);
  });

  console.log('📊 CLUSTER-VERTEILUNG IM BLOG:');
  console.log('='.repeat(80));

  Object.entries(clusterCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cluster, count]) => {
      console.log(`\n${cluster}: ${count} Artikel`);
      clusterPosts[cluster].forEach(title => {
        console.log(`  - ${title.substring(0, 70)}${title.length > 70 ? '...' : ''}`);
      });
    });

  console.log('\n' + '='.repeat(80));
  console.log(`GESAMT: ${posts.length} Artikel über ${Object.keys(clusterCounts).length} Cluster\n`);

  // Show which clusters have NO content
  const allClusters = [
    'Rücken & Wirbelsäule',
    'Nacken & HWS',
    'Kopf & Nerven',
    'Knie & Hüfte',
    'Sport & Leistung',
    'Verdauung',
    'Osteopathie Allgemein'
  ];

  const missingClusters = allClusters.filter(c => !clusterCounts[c]);

  if (missingClusters.length > 0) {
    console.log('⚠️  CLUSTER OHNE CONTENT:');
    console.log('='.repeat(80));
    missingClusters.forEach(cluster => {
      console.log(`❌ ${cluster}`);
    });
    console.log('');
  }
}

analyzeClusters();
