import service from '../asserts/images/services/project1.webp'
import icon from '../asserts/images/services/icon.webp'

let services= [
    {
      title: '3D Printing services',
      description: `Turn your ideas into reality with our precision 3D printing services. From supporting university 
projects with high-quality prototypes to creating custom designs tailored to your specific needs, 
we provide reliable, professional 3D printing solutions for academic, personal, and commercial 
purposes.`,
      image: service,
      technologies: ['PLA', 'Dual-layer', 'Prototypes'],
    },
    {
      title: 'CAD Modeling ',
      description:`Bring your concepts to life with our expert CAD modeling services. Whether designing 
agricultural tools like seed meters and electric hoes or advanced systems like Delta robots and 
bucket conveyors, we deliver precise, functional models that turn innovation into reality. `,
      image: service,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    }, 
    {
      title: 'PCB Designing',
      description: `Create efficient, high-performance circuit boards with our PCB designing services. From 
prototypes to production-ready solutions, we focus on delivering reliable designs that meet your 
exact specifications and industry standards. `,
      image: service,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'IoT Solutions',
      description: `Step into the future with our cutting-edge IoT solutions. We specialize in creating smart devices 
and systems that enable automation, remote monitoring, and data-driven decision-making, 
empowering individuals and businesses to thrive in a connected world. `,
      image: service,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'R&D Innovation',
      description: `Innovate with purpose through our research and development services. Whether designing 
advanced rovers for exploration or working on groundbreaking prototypes, we collaborate with 
you to create impactful solutions that push the boundaries of technology and innovation. `,
      image: service,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'Learning and Development',
      description:`Discover a world of learning with our hands-on education programs. Build robots in interactive 
      workshops, explore STEM with innovative kits, master SolidWorks for CAD design, and learn to 
      program in C, C++, and Python. Our courses are designed to inspire curiosity and equip you with 
      practical skills for the future.`,
      image: service,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'Customized Gifts and Accessories',
      description: `Make moments unforgettable with our personalized gifts and accessories. Choose from elegant 
table calendars, enchanting moon lamps, bespoke vases, creative wall-mounted hands, and 
durable key tags. Each item is thoughtfully crafted to reflect your personality or brand, making it 
perfect for gifts or decor. `,
      image: service,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'Project Assistance',
      description:`We’re your trusted partner in innovation, offering expert guidance and technical assistance to 
help you bring your projects to life. Whether you're a student or a startup, we provide the 
resources and support needed to achieve your goals. `,
      image: service,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
  
    {
      title: 'Expanded Services',
      description: `Expand your creative possibilities with our professional graphic design services. Whether you 
need eye-catching logos, engaging branding, or striking promotional materials, we craft designs 
that leave a lasting impression.`,
      image: service,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
  ];
services=services.map((service=>({...service, slug:service.title.toLowerCase().trim().replace(/ /g,"-"),icon})))
export default services