import { Product } from '@/types/product'

export const products: Product[] = [
  {
    id: '1',
    name: 'NewWay GTA V',
    baseDescription: 'Take your GTA V experience to the next level with the NewWay mod menu-the ultimate tool for playing and modding both GTA V Legacy and GTA V Enhanced versions.',
    details: {
      description: `The NewWay GTA V mod menu is the most advanced and feature-rich modification tool available for Grand Theft Auto V. Designed for both Legacy and Enhanced versions of the game, this powerful menu offers unprecedented control over your gaming experience.

With over 200+ unique features, NewWay transforms your GTA V sessions into limitless adventures. From vehicle spawning and customization to advanced player modifications and world manipulation, every aspect of Los Santos becomes your playground.

Our mod menu is built with stability and security in mind, featuring advanced anti-detection systems and regular updates to ensure compatibility with the latest game versions. Whether you're looking to create epic stunts, explore hidden areas, or simply have fun with friends, NewWay delivers the tools you need.`,
      howToUse: [
  'Download the NewWay installer (EXE) from your account dashboard or the official NewWay website.',
  'Run the downloaded EXE file — this will open the NewWay loader.',
  'Log in to your account through the loader.',
  'Open GTA V and, in the main menu screen, inject using the loader.',
  'Select Story Mode from the main menu.',
  'Once inside Story Mode, switch to GTA Online in a Solo Session.',
  'Press F8 or Insert to open the NewWay menu interface.',
  'Navigate through categories using the mouse.',
  'Select features by clicking.',
  'Use F8 or Insert again to close the menu at any time.',
  'Access saved configurations in the Settings tab.'
],

      specifications: {
        'Supported Versions': 'GTA V Legacy & Enhanced Edition',
        'Updates': 'Updated regularly',
        'Memory Usage': '< 50MB RAM',
        'Features': '200+ Unique Options',
        'Plataform': 'Rockstar Launcher / Epic Games / Steam',
        'Support': '24/7 Discord Community'
      },
      systemRequirements: {
        'OS': 'Windows 10 64-bit or newer',
        'Processor': 'Intel Core i5-3470 / AMD FX-8350',
        'Memory': '8 GB RAM minimum',
        'Graphics': 'NVIDIA GTX 660 / AMD HD 7870',
        'DirectX': 'Version 11',
        'Storage': '100 MB available space'
      }
    },
    rating: 4.2,
    reviews: [
      {
        id: '1',
        userId: '1',
        userName: 'Michael De Santa',
        userAvatar: 'https://cdn.discordapp.com/attachments/1066124373934743602/1403406880641908736/360.png?ex=68977002&is=68961e82&hm=a0f4b3c7f8c551179d24e77344a4139b024198092b1f1fd9a0152dc4b2100130&',
        rating: 5,
        comment: 'Amazing mod menu! Works perfectly with both versions of GTA V. The features are incredible and the anti-detection is top-notch.',
        date: '2024-01-15',
        verified: true
      },
      {
        id: '2',
        userId: '2',
        userName: 'Franklin Clinton',
        userAvatar: 'https://img.gta5-mods.com/q75/images/franklin-new-face/39ee7d-1.png',
        rating: 5,
        comment: 'Great value for money. Lifetime version is definitely worth it. Some features could be more intuitive but overall excellent.',
        date: '2024-01-10',
        verified: true
      },
      {
        id: '3',
        userId: '3',
        userName: 'Trevor Phillips',
        userAvatar: 'https://cdn.discordapp.com/attachments/1066124373934743602/1403408224895635536/200px-Trevor.png?ex=68977142&is=68961fc2&hm=cdfd3b61e315092aa3dfc401733d43495a45c0ae29b51419b6c148e6681edd1a&',
        rating: 5,
        comment: 'Best mod menu I\'ve ever used. Regular updates and amazing support from the team. Highly recommended!',
        date: '2024-01-08',
        verified: false
      }
    ],
    category: 'Gaming Mods',
    images: [
      'https://media.discordapp.net/attachments/1066124373934743602/1403375203215737044/1x1_nw_gta.webp?ex=68975281&is=68960101&hm=ae1374f8665bfcc7df4a36ceeb9c9f1bed627d5e8ae6288fb67099a6ef5a7009&=&format=webp&width=856&height=856',
      'https://media.discordapp.net/attachments/1066124373934743602/1403375203601485834/1x1_menu_gta.webp?ex=68975281&is=68960101&hm=22bfbebc25e7dc5e4dd8413b787baafbd3bbbe5a16c97eaaf86b1091e476f71e&=&format=webp&width=856&height=856',
      'https://cdn.discordapp.com/attachments/1066124373934743602/1403408995410116689/maxresdefault.png?ex=689771fa&is=6896207a&hm=ced1ff0430eaec14bd009a398545d7073e87c9395fd7021b63ac31536691b22b&',
      'https://media.discordapp.net/attachments/1066124373934743602/1403375203601485834/1x1_menu_gta.webp?ex=68975281&is=68960101&hm=22bfbebc25e7dc5e4dd8413b787baafbd3bbbe5a16c97eaaf86b1091e476f71e&=&format=webp&width=856&height=856'
    ],
    versions: [
      {
        id: 'lifetime',
        name: 'Lifetime Version',
        price: 35.90,
        originalPrice: 59.90,
        stock: 50,
        description: 'Permanent access to all features with lifetime updates and premium support.',
        features: ['Lifetime Access', 'All Features Unlocked', 'Priority Support', 'Free Updates Forever']
      },
      {
        id: 'month',
        name: 'Monthly Version',
        price: 9.90,
        originalPrice: 14.90,
        stock: 100,
        description: 'Monthly subscription with full access to all mod features.',
        features: ['30 Days Access', 'All Features', 'Standard Support', 'Monthly Updates']
      },
      {
        id: 'week',
        name: 'Weekly Version',
        price: 4.90,
        originalPrice: 7.90,
        stock: 200,
        description: 'Perfect for trying out the mod with 7 days of full access.',
        features: ['7 Days Access', 'All Features', 'Basic Support', 'Weekly Updates']
      }
    ],
    relatedProducts: ['2', '3', '4']
  },
  {
    id: '2',
    name: 'Gaming Controller Pro',
    baseDescription: 'Professional gaming controller with advanced features for competitive gaming.',
    details: {
      description: `Experience gaming like never before with the Gaming Controller Pro. This premium controller combines cutting-edge technology with ergonomic design to deliver unparalleled performance for competitive and casual gaming alike.

Featuring customizable RGB lighting, programmable buttons, and advanced haptic feedback, every game becomes more immersive. The controller's precision analog sticks and responsive triggers give you the competitive edge you need.

Built with premium materials and designed for durability, this controller can withstand intense gaming sessions while maintaining peak performance.`,
      howToUse: [
        'Connect via USB-C cable or Bluetooth',
        'Install the companion software for customization',
        'Configure button mappings and RGB lighting',
        'Calibrate analog sticks for optimal precision',
        'Create profiles for different games',
        'Use the turbo function for rapid-fire actions'
      ],
      specifications: {
        'Connection': 'USB-C / Bluetooth 5.0',
        'Battery Life': '20-30 hours',
        'Compatibility': 'PC, PlayStation, Xbox, Switch',
        'Weight': '280g',
        'Dimensions': '15.5 x 10.5 x 6.2 cm'
      }
    },
    rating: 4.8,
    reviews: [
      {
        id: '4',
        userId: '4',
        userName: 'ProGamer',
        userAvatar: '/placeholder.svg?height=40&width=40&text=PG',
        rating: 5,
        comment: 'Best controller I\'ve ever used. The precision is incredible!',
        date: '2024-01-12',
        verified: true
      }
    ],
    category: 'Gaming Hardware',
    images: [
      'https://cdn.discordapp.com/attachments/1066124373934743602/1403161290578460712/gamingcontroller.jpg?ex=68973409&is=6895e289&hm=17282dd34570e7404e1933acaff5531f45fb0341151d4d871fb8223de33e5a8d&',
      '/placeholder.svg?height=500&width=500&text=Controller+RGB',
      '/placeholder.svg?height=500&width=500&text=Controller+Back'
    ],
    versions: [
      {
        id: 'standard',
        name: 'Standard Edition',
        price: 120,
        originalPrice: 150,
        stock: 25,
        description: 'High-quality gaming controller with standard features.',
        features: ['Wireless Connection', 'RGB Lighting', '20h Battery Life', '1 Year Warranty']
      },
      {
        id: 'pro',
        name: 'Pro Edition',
        price: 180,
        originalPrice: 220,
        stock: 15,
        description: 'Professional edition with advanced customization options.',
        features: ['Wireless + Wired', 'Customizable RGB', '30h Battery', 'Pro Software']
      },
            {
        id: 'standard',
        name: 'X Edition',
        price: 220,
        originalPrice: 300,
        stock: 5,
        description: 'Unleash your potential with our high-performance gaming controller.',
        features: ['Wireless Connection', 'Customizable RGB Lighting', '40H Battery','3 Year Warranty'
]
      }
    ],
    relatedProducts: ['1', '3', '4']
  },
  {
    id: '3',
    name: 'RGB Gaming Keyboard',
    baseDescription: 'Mechanical gaming keyboard with full RGB customization and premium switches.',
    details: {
      description: `Elevate your gaming setup with this premium RGB mechanical keyboard. Featuring high-quality mechanical switches, customizable per-key RGB lighting, and a durable aluminum frame.

Perfect for both gaming and productivity, this keyboard offers the tactile feedback and precision that serious gamers demand. The customizable RGB lighting system allows you to create stunning visual effects that match your setup.`,
      howToUse: [
        'Connect via USB cable',
        'Install RGB control software',
        'Customize lighting effects',
        'Program macro keys',
        'Adjust switch sensitivity',
        'Create custom profiles for different games'
      ],
      specifications: {
        'Switch Type': 'Mechanical (Blue/Red/Brown)',
        'Backlighting': 'Per-key RGB',
        'Connection': 'USB 2.0',
        'Key Layout': 'Full Size (104 keys)',
        'Polling Rate': '1000Hz'
      }
    },
    rating: 4.6,
    reviews: [
      {
        id: '5',
        userId: '5',
        userName: 'KeyboardMaster',
        userAvatar: '/placeholder.svg?height=40&width=40&text=KM',
        rating: 5,
        comment: 'Amazing keyboard! The RGB effects are stunning and the switches feel great.',
        date: '2024-01-14',
        verified: true
      },
      {
        id: '6',
        userId: '6',
        userName: 'GamingSetup',
        userAvatar: '/placeholder.svg?height=40&width=40&text=GS',
        rating: 4,
        comment: 'Good quality keyboard, love the customization options.',
        date: '2024-01-11',
        verified: false
      }
    ],
    category: 'Gaming Hardware',
    images: [
      'https://media.discordapp.net/attachments/1066124373934743602/1403161399420518410/71jTFJkBt7L.png?ex=68973423&is=6895e2a3&hm=49bc726c14f097ec4c3a9b7308f1d626a8e3e52ad40c69fc8d16449517826a33&=&format=webp&quality=lossless&width=960&height=960',
      '/placeholder.svg?height=500&width=500&text=Keyboard+RGB'
    ],
    versions: [
      {
        id: 'basic',
        name: 'Basic RGB',
        price: 89,
        originalPrice: 120,
        stock: 40,
        description: 'Essential RGB keyboard with mechanical switches.',
        features: ['Mechanical Switches', 'RGB Backlighting', 'Anti-Ghosting', 'USB Connection']
      },
      {
        id: 'premium',
        name: 'Premium RGB',
        price: 149,
        originalPrice: 200,
        stock: 20,
        description: 'Premium keyboard with advanced features and software.',
        features: ['Premium Switches', 'Per-Key RGB', 'Macro Keys', 'Software Control', 'Wrist Rest']
      }
    ],
    relatedProducts: ['1', '2', '4']
  },
  {
    id: '4',
    name: 'Gaming Monitor 4K',
    baseDescription: 'Ultra-wide 4K gaming monitor with high refresh rate.',
    details: {
      description: `Experience gaming in stunning 4K resolution with this premium gaming monitor. Features high refresh rate, low input lag, and HDR support for the ultimate visual experience.

This monitor is designed for serious gamers who demand the best visual quality and performance. With its fast response time and high refresh rate, you'll have the competitive edge in fast-paced games.`,
      howToUse: [
        'Connect via HDMI or DisplayPort',
        'Adjust display settings in OSD menu',
        'Enable gaming mode for optimal performance',
        'Configure HDR settings for supported content',
        'Calibrate color settings to your preference',
        'Use multiple input sources for versatility'
      ],
      specifications: {
        'Resolution': '3840 x 2160 (4K)',
        'Refresh Rate': '144Hz',
        'Panel Type': 'IPS',
        'Response Time': '1ms',
        'Connectivity': 'HDMI 2.1, DisplayPort 1.4'
      }
    },
    rating: 4.9,
    reviews: [
      {
        id: '7',
        userId: '7',
        userName: 'VisualPro',
        userAvatar: '/placeholder.svg?height=40&width=40&text=VP',
        rating: 5,
        comment: 'Incredible display quality! The 4K resolution is crystal clear.',
        date: '2024-01-13',
        verified: true
      }
    ],
    category: 'Gaming Hardware',
    images: [
      'https://media.discordapp.net/attachments/1066124373934743602/1403375203974910183/monitor-gamer-gigabyte-qd-oled-32-165hz-4k-0-03ms-displayport-1-4-e-hdmi-2-1-99-dci-p3-hdr-freesync-premium-kvm-mo32u-sa_1744034078_gg.png?ex=68975282&is=68960102&hm=669569e5ab2f725d675ec84e1e54a65f96b86bda806c4ee7bd9e3ed2148ea349&=&format=webp&quality=lossless&width=856&height=856',
      '/placeholder.svg?height=500&width=500&text=Monitor+Side'
    ],
    versions: [
      {
        id: 'standard',
        name: '27" 4K Monitor',
        price: 599,
        originalPrice: 799,
        stock: 10,
        description: '27-inch 4K gaming monitor with premium features.',
        features: ['4K Resolution', '144Hz Refresh Rate', 'HDR Support', '1ms Response Time']
      }
    ],
    relatedProducts: ['1', '2', '3']
  }
]
