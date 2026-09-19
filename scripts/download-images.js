const fs = require('fs');
const path = require('path');
const https = require('https');

const dirs = [
  './public',
  './public/images',
  './public/images/products',
  './public/images/categories',
  './public/images/ingredients',
  './public/images/story'
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
    console.log('Created directory:', d);
  }
});

const downloads = [
  // Hero: Ultra premium gourmet chocolate chip oat cookies with sea salt and chocolate melt
  {
    dest: './public/images/hero-cookies.jpg',
    url: 'https://images.unsplash.com/photo-1557089706-68d02dbda277?auto=format&fit=crop&w=1600&q=95'
  },
  // Products
  {
    dest: './public/images/products/choco-oats.jpg',
    url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1000&q=85'
  },
  {
    dest: './public/images/products/almond-cranberry.jpg',
    url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1000&q=85'
  },
  {
    dest: './public/images/products/jaggery-millet.jpg',
    url: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1000&q=85'
  },
  {
    dest: './public/images/products/choco-cupcake.jpg',
    url: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=1000&q=85'
  },
  {
    dest: './public/images/products/banana-muffin.jpg',
    url: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=1000&q=85'
  },
  {
    dest: './public/images/products/granola-bar.jpg',
    url: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=1000&q=85'
  },
  {
    dest: './public/images/products/millet-snack.jpg',
    url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=1000&q=85'
  },
  {
    dest: './public/images/products/roasted-seeds.jpg',
    url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1000&q=85'
  },
  {
    dest: './public/images/products/gifting-box.jpg',
    url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85'
  },

  // Categories
  {
    dest: './public/images/categories/cookies.jpg',
    url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80'
  },
  {
    dest: './public/images/categories/cupcakes.jpg',
    url: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80'
  },
  {
    dest: './public/images/categories/granola.jpg',
    url: 'https://images.unsplash.com/photo-1590080874088-eec64895b423?auto=format&fit=crop&w=800&q=80'
  },
  {
    dest: './public/images/categories/snacks.jpg',
    url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80'
  },
  {
    dest: './public/images/categories/gifting.jpg',
    url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
  },

  // Story
  {
    dest: './public/images/story/baking.jpg',
    url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=85'
  },

  // Ingredients
  {
    dest: './public/images/ingredients/oats.jpg',
    url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'
  },
  {
    dest: './public/images/ingredients/millets.jpg',
    url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'
  },
  {
    dest: './public/images/ingredients/almonds.jpg',
    url: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80'
  },
  {
    dest: './public/images/ingredients/jaggery.jpg',
    url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80'
  },
  {
    dest: './public/images/ingredients/chocolate.jpg',
    url: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600&q=80'
  },
  {
    dest: './public/images/ingredients/seeds.jpg',
    url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80'
  }
];

function downloadFile(item) {
  return new Promise((resolve, reject) => {
    https.get(item.url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, redirectRes => {
          const fileStream = fs.createWriteStream(item.dest);
          redirectRes.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            console.log('Downloaded (redirect):', item.dest, redirectRes.statusCode);
            resolve();
          });
        }).on('error', reject);
        return;
      }
      if (res.statusCode !== 200) {
        console.error('Failed to download:', item.dest, 'status:', res.statusCode);
        resolve(); // don't reject so others finish
        return;
      }
      const fileStream = fs.createWriteStream(item.dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log('Downloaded:', item.dest, 'Size:', fs.statSync(item.dest).size, 'bytes');
        resolve();
      });
    }).on('error', err => {
      console.error('Error for', item.dest, err.message);
      resolve();
    });
  });
}

async function run() {
  console.log(`Starting download of ${downloads.length} high-res images...`);
  for (const item of downloads) {
    await downloadFile(item);
  }
  console.log('All downloads completed!');
}

run();
