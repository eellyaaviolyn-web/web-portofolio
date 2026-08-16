import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

const translations = {
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      services: 'Layanan',
      projects: 'Proyek',
      education: 'Pendidikan',
      blog: 'Blog',
      contact: 'Kontak'
    },
    hero: {
      greeting: 'Halo Semuanya, Saya',
      welcome: 'Selamat Datang Di Portofolio Saya',
      desc: 'Saya adalah seorang siswa SMK Bakti Nusantara 666 jurusan Pengembangan Perangkat Lunak dengan passion di dunia pengembangan website.',
      viewWork: 'Lihat Karya',
      contactMe: 'Hubungi Saya'
    },
    about: {
      title: 'Tentang',
      subtitle: 'Saya',
      roleTitle1: 'Siswa PPLG &',
      roleTitle2: 'Pengembang Perangkat Lunak',
      desc1: 'Saya adalah siswa SMK Bakti Nusantara 666 jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) yang memiliki minat besar di bidang teknologi, khususnya pengembangan perangkat lunak. Saya terbiasa membuat aplikasi sederhana, mengelola data, serta memahami dasar pemrograman.',
      skillsTitle: 'Skill & Keahlian',
      skillsDesc: 'Berikut adalah beberapa skill & keahlian yang saya miliki:',
      skills: [
        'Menguasai dasar pemrograman: PHP, HTML, CSS, JavaScript',
        'Penggunaan database MySQL',
        'Pengembangan website sederhana',
        'Microsoft Office (Word, Excel, PowerPoint)',
        'Problem solving dan logika pemrograman',
        'Kerja tim dan komunikasi',
        'Manajemen waktu dan disiplin kerja'
      ],
      orgTitle: 'Pengalaman Organisasi',
      orgDesc: 'Saya memiliki pengalaman organisasi yang membantu mengembangkan kemampuan kerja sama tim, komunikasi, dan kepemimpinan. Saya adalah pribadi yang disiplin, bertanggung jawab, dan cepat beradaptasi serta siap untuk terus belajar dan berkembang di dunia kerja maupun magang.',
      connectTitle: 'Mari Terkoneksi',
      connectDesc: 'Saya selalu terbuka untuk kolaborasi, diskusi proyek, atau peluang magang dan profesional baru. Silakan hubungi saya melalui media sosial atau jaringan di bawah ini.',
      connectBtn: 'Hubungi Saya'
    },
    services: {
      title: 'Layanan &',
      subtitle: 'Keahlian Khusus',
      desc: 'Beberapa bidang utama yang saya kuasai dan siap saya kerjakan.',
      list: [
        {
          title: 'Pengembangan Web',
          desc: 'Membangun website responsif dan dinamis menggunakan HTML, CSS, JavaScript, dan PHP.'
        },
        {
          title: 'Manajemen Basis Data',
          desc: 'Perancangan dan pengelolaan struktur data yang rapi dan aman menggunakan MySQL.'
        },
        {
          title: 'Desain UI/UX Dasar',
          desc: 'Merancang antarmuka aplikasi yang intuitif, bersih, dan memanjakan mata pengguna.'
        }
      ]
    },
    projects: {
      title: 'Proyek',
      subtitle: 'Saya',
      desc: 'Berikut adalah beberapa proyek yang telah saya kerjakan.',
      viewProject: 'Lihat Proyek',
      empty: 'Belum ada proyek yang ditampilkan.'
    },
    education: {
      title: 'Pendidikan',
      subtitle: 'Saya',
      list: [
        {
          year: '2024 - sekarang',
          degree: 'Sekolah Menengah Kejuruan (SMK)',
          institution: 'SMK BAKTI NUSANTARA 666',
          description: 'Mempelajari keterampilan teknis dan praktis dalam bidang teknologi dan pengembangan perangkat lunak.'
        },
        {
          year: '2021 - 2024',
          degree: 'Sekolah Menengah Pertama (SMP)',
          institution: 'MTS Plus Darul Hufadz',
          description: 'Meningkatkan pengetahuan akademis sekaligus mengembangkan disiplin dan keterampilan berpikir kritis.'
        },
        {
          year: '2015 - 2021',
          degree: 'Sekolah Dasar (SD)',
          institution: 'SDN CIKOPO 1',
          description: 'Membangun fondasi yang kuat dalam mata pelajaran inti dan mengembangkan keterampilan belajar yang penting.'
        }
      ]
    },
    techstack: {
      title: 'Teknologi',
      subtitle: 'Yang Dikuasai'
    },
    blog: {
      title: 'Artikel',
      subtitle: 'Terbaru',
      desc: 'Catatan perjalanan, tutorial, dan hal menarik seputar dunia pengembangan web.',
      readMore: 'Baca Selengkapnya'
    },
    contact: {
      title: 'Kontak',
      subtitle: 'Saya',
      desc: 'Jangan ragu untuk menghubungi saya jika Anda memiliki pertanyaan atau ingin terhubung!',
      formName: 'Nama Lengkap',
      formEmail: 'Alamat Email',
      formMessage: 'Pesan Anda',
      send: 'Kirim Pesan',
      sending: 'Mengirim...',
      connectTitle: "Mari Terhubung",
      rights: 'Hak Cipta Dilindungi.',
      adminLogin: 'Login Admin'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      education: 'Education',
      blog: 'Blog',
      contact: 'Contact'
    },
    hero: {
      greeting: 'Hello Everyone, I am',
      welcome: 'Welcome To My Portfolio',
      desc: 'I am a student at SMK Bakti Nusantara 666 majoring in Software Engineering with a passion for web development.',
      viewWork: 'View My Work',
      contactMe: 'Contact Me'
    },
    about: {
      title: 'About',
      subtitle: 'Me',
      roleTitle1: 'Software Engineering',
      roleTitle2: 'Student & Developer',
      desc1: 'I am a student at SMK Bakti Nusantara 666 majoring in Software Engineering (PPLG) with a huge interest in technology, especially software development. I am used to creating simple applications, managing data, and understanding programming basics.',
      skillsTitle: 'Skills & Expertise',
      skillsDesc: 'Here are some of the skills and expertise I possess:',
      skills: [
        'Programming basics: PHP, HTML, CSS, JavaScript',
        'Database usage: MySQL',
        'Simple website development',
        'Microsoft Office (Word, Excel, PowerPoint)',
        'Problem solving and programming logic',
        'Teamwork and communication',
        'Time management and work discipline'
      ],
      orgTitle: 'Organizational Experience',
      orgDesc: 'I have organizational experience that helps develop teamwork, communication, and leadership skills. I am a disciplined, responsible, and adaptable person ready to keep learning and growing in the professional world or internships.',
      connectTitle: "Let's Connect",
      connectDesc: 'I am always open to collaboration, project discussions, or new internship and professional opportunities. Feel free to contact me through social media or the networks below.',
      connectBtn: 'Contact Me'
    },
    services: {
      title: 'Services &',
      subtitle: 'Expertise',
      desc: 'Key areas I specialize in and am ready to work on.',
      list: [
        {
          title: 'Web Development',
          desc: 'Building responsive and dynamic websites using HTML, CSS, JavaScript, and PHP.'
        },
        {
          title: 'Database Management',
          desc: 'Designing and managing clean and secure data structures using MySQL.'
        },
        {
          title: 'Basic UI/UX Design',
          desc: 'Designing intuitive, clean, and visually pleasing application interfaces.'
        }
      ]
    },
    projects: {
      title: 'My',
      subtitle: 'Projects',
      desc: 'Here are some of the projects I have worked on.',
      viewProject: 'View Project',
      empty: 'No projects to display yet.'
    },
    education: {
      title: 'My',
      subtitle: 'Education',
      list: [
        {
          year: '2024 - now',
          degree: 'Vocational High School',
          institution: 'SMK BAKTI NUSANTARA 666',
          description: 'Studying technical and practical skills in the field of technology and software development.'
        },
        {
          year: '2021 - 2024',
          degree: 'Junior High School',
          institution: 'MTS Plus Darul Hufadz',
          description: 'Improving academic knowledge while developing discipline and critical thinking skills.'
        },
        {
          year: '2015 - 2021',
          degree: 'Elementary School',
          institution: 'SDN CIKOPO 1',
          description: 'Building a strong foundation in core subjects and developing essential learning skills.'
        }
      ]
    },
    techstack: {
      title: 'Tech',
      subtitle: 'Stack'
    },
    blog: {
      title: 'Recent',
      subtitle: 'Articles',
      desc: 'Journey logs, tutorials, and interesting things around web development.',
      readMore: 'Read More'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Me',
      desc: 'Do not hesitate to reach out if you have any questions or want to connect!',
      formName: 'Full Name',
      formEmail: 'Email Address',
      formMessage: 'Your Message',
      send: 'Send Message',
      sending: 'Sending...',
      connectTitle: "Let's Connect",
      rights: 'All rights reserved.',
      adminLogin: 'Admin Login'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('id');

  useEffect(() => {
    const savedLang = localStorage.getItem('portfolio_language');
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'id' ? 'en' : 'id';
    setLanguage(newLang);
    localStorage.setItem('portfolio_language', newLang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
