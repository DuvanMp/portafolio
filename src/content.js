// Todo el texto del sitio vive aquí. Edita este archivo para actualizar tu portafolio.

export const profile = {
  name: 'Duvan Martínez',
  firstName: 'Duvan',
  lastName: 'Martínez',
  photo: '/foto.jpg',
  email: 'duvanmar1098@gmail.com',
  location: 'Bucaramanga, Colombia',
  // Agrega tus enlaces cuando los tengas; los vacíos no se muestran.
  links: {
    github: 'https://github.com/DuvanMp',
    linkedin: 'https://www.linkedin.com/in/duvanmartinez2511',
  },
};

export const content = {
  es: {
    nav: { about: 'Sobre mí', services: 'Servicios', experience: 'Experiencia', projects: 'Proyectos', contact: 'Contacto' },
    hero: {
      role: 'Desarrollador Full Stack Senior',
      lines: ['.NET | Node.js | React | AWS', 'Más de 10 años construyendo software a la medida'],
      featured: 'Cómo construyo',
      title: 'Construyo software que funciona en producción, no solo en la demo.',
      intro:
        'Ingeniero de Sistemas con más de 10 años diseñando y desarrollando aplicaciones a la medida para empresas del sector financiero, corporativo y de gestión documental. Me encargo del proyecto completo: desde entender tu necesidad hasta dejarlo funcionando en la nube.',
      ctaPrimary: 'Cuéntame tu proyecto',
      ctaSecondary: 'Ver proyectos',
      traceCaption: 'Así viaja una petición por un sistema que construyo: cada capa medida, registrada y con reintentos si algo falla.',
    },
    trace: [
      { label: 'Interfaz en React', ms: 38, start: 0, tone: 'a' },
      { label: 'API en Node.js / .NET', ms: 64, start: 22, tone: 'b' },
      { label: 'Reglas de negocio', ms: 21, start: 40, tone: 'b' },
      { label: 'Cola de mensajes (SQS)', ms: 47, start: 58, tone: 'c' },
      { label: 'Base de datos PostgreSQL', ms: 29, start: 72, tone: 'c' },
      { label: 'Registro de auditoría', ms: 12, start: 92, tone: 'a' },
    ],
    traceTotal: 'Petición completa',
    about: {
      title: 'Sobre mí',
      body: [
        'He pasado la mayor parte de mi carrera construyendo sistemas donde un error cuesta dinero: migraciones de cartera bancaria, procesamiento de transacciones y plataformas que no pueden caerse.',
        'Eso me dejó una forma de trabajar: entender bien el problema antes de escribir código, dejar todo trazable y documentado, y entregar por avances para que siempre sepas en qué va tu proyecto.',
      ],
      facts: [
        { value: '10+', label: 'años desarrollando software' },
        { value: '60 %', label: 'menos tiempo de despliegue en mi último rol' },
        { value: '30 %', label: 'menos costo de infraestructura en la nube' },
      ],
    },
    services: {
      title: 'Lo que puedo hacer por ti',
      items: [
        { name: 'Aplicaciones web a la medida', desc: 'Sistemas administrativos, portales, plataformas de aprendizaje y paneles de control, de punta a punta.' },
        { name: 'APIs y backend', desc: 'Servicios robustos con Node.js y .NET, integraciones con otros sistemas y procesos en segundo plano.' },
        { name: 'Frontend moderno', desc: 'Interfaces rápidas y claras con React y Angular, adaptadas a celular y escritorio.' },
        { name: 'Bases de datos', desc: 'Diseño, optimización de consultas y migración de grandes volúmenes en PostgreSQL y SQL Server.' },
        { name: 'Nube y despliegue', desc: 'AWS y Azure, Docker, Kubernetes y despliegue automático para publicar cambios sin sustos.' },
        { name: 'Rescate de sistemas existentes', desc: 'Corrijo errores, mejoro el rendimiento y modernizo aplicaciones que ya tienes funcionando.' },
      ],
    },
    experience: {
      title: 'Experiencia',
      items: [
        {
          period: 'Actualidad',
          company: 'Proyecto independiente',
          role: 'Desarrollador Full Stack',
          desc: 'Plataforma web de aprendizaje de inglés para el mercado ruso, con un cliente en Australia. React y Node.js.',
        },
        {
          period: '2021 – actualidad',
          company: 'Fundación de la Mujer',
          role: 'Especialista de software',
          desc: 'Migración del core bancario, flujos asíncronos tolerantes a fallos en AWS, auditoría de transacciones y despliegue continuo en Kubernetes.',
        },
        {
          period: '2020 – 2021',
          company: 'EO Datos y Documentos',
          role: 'Desarrollador Senior .NET',
          desc: 'Lideré la migración y estabilización de 3 aplicaciones web críticas y establecí estándares de calidad que redujeron 25 % los errores en producción.',
        },
        {
          period: '2014 – 2020',
          company: 'SOLINT Soluciones Integradas',
          role: 'Desarrollador de software',
          desc: 'Software a la medida para clientes corporativos durante casi 7 años: desarrollo, puesta en marcha y soporte en Azure.',
        },
      ],
    },
    projects: {
      title: 'Proyectos destacados',
      note: 'Los proyectos hechos para empresas los describo sin datos internos, por confidencialidad.',
      items: [
        {
          name: 'FincaMedir Rural',
          context: 'Proyecto propio, propuesta conceptual',
          problem: 'Medir y organizar los terrenos de una finca sin equipos costosos ni conocimientos técnicos.',
          solution: 'App móvil que calcula el área y el perímetro de cada lote caminando el lindero con el GPS del celular, organiza la finca por uso del suelo (potrero, cultivo, corral, bosque) y genera informes en PDF y KML para Google Earth. Incluye una plataforma web donde el dueño ve todas sus fincas y recibe las mediciones del campo sincronizadas.',
          stack: ['App móvil', 'Plataforma web', 'GPS', 'Mapas', 'Informes PDF y KML'],
          video: '/fincamedir.mp4',
          poster: '/fincamedir.jpg',
        },
        {
          name: 'Migración de cartera a nuevo core bancario',
          context: 'Sector financiero',
          problem: 'Mover miles de créditos al nuevo core sin perder un solo dato y en una ventana de tiempo corta.',
          solution: 'Servicio de migración con procesos programados y procesamiento en paralelo que redujo drásticamente los tiempos y garantizó la integridad de la información.',
          stack: ['C#', '.NET Core', 'SQL Server', 'AWS'],
        },
        {
          name: 'Procesamiento de transacciones con trazabilidad',
          context: 'Sector financiero',
          problem: 'Procesar operaciones de forma asíncrona sin perder ninguna cuando un servicio falla.',
          solution: 'Flujo orientado a eventos con colas de error y reintentos automáticos, auditoría de cada transacción y alertas centralizadas. Despliegue 60 % más rápido y 30 % menos costo de infraestructura.',
          stack: ['.NET', 'EventBridge', 'SQS', 'DynamoDB', 'Lambda', 'EKS'],
        },
        {
          name: 'Plataforma de aprendizaje de inglés',
          context: 'Proyecto freelance en curso',
          problem: 'Ofrecer a estudiantes rusos una plataforma web para aprender inglés en línea.',
          solution: 'Desarrollo full stack del producto, trabajando de forma remota y directa con el cliente en Australia.',
          stack: ['React', 'Node.js'],
        },
      ],
    },
    contact: {
      title: '¿Tienes un proyecto en mente?',
      body: 'Cuéntame qué necesitas y te respondo con una propuesta de cómo hacerlo, tiempos y costo.',
      name: 'Tu nombre',
      email: 'Tu correo',
      message: 'Cuéntame sobre tu proyecto',
      send: 'Enviar mensaje',
      sending: 'Enviando…',
      sent: 'Mensaje enviado. Te responderé lo antes posible.',
      error: 'No se pudo enviar el mensaje. Escríbeme directamente a',
      required: 'Completa tu nombre, un correo válido y el mensaje.',
      orEmail: 'También puedes escribirme a',
    },
    footer: 'Hecho con React y Node.js.',
  },

  en: {
    nav: { about: 'About', services: 'Services', experience: 'Experience', projects: 'Projects', contact: 'Contact' },
    hero: {
      role: 'Senior Full Stack Developer',
      lines: ['.NET | Node.js | React | AWS', '10+ years building custom software'],
      featured: 'How I build',
      title: 'I build software that works in production, not just in the demo.',
      intro:
        'Systems engineer with 10+ years designing and building custom applications for financial, corporate and document-management companies. I take care of the whole project: from understanding what you need to running it in the cloud.',
      ctaPrimary: 'Tell me about your project',
      ctaSecondary: 'See projects',
      traceCaption: 'How a request travels through a system I build: every layer measured, logged, and retried if something fails.',
    },
    trace: [
      { label: 'React interface', ms: 38, start: 0, tone: 'a' },
      { label: 'Node.js / .NET API', ms: 64, start: 22, tone: 'b' },
      { label: 'Business rules', ms: 21, start: 40, tone: 'b' },
      { label: 'Message queue (SQS)', ms: 47, start: 58, tone: 'c' },
      { label: 'PostgreSQL database', ms: 29, start: 72, tone: 'c' },
      { label: 'Audit log', ms: 12, start: 92, tone: 'a' },
    ],
    traceTotal: 'Full request',
    about: {
      title: 'About me',
      body: [
        'I have spent most of my career building systems where a bug costs money: banking portfolio migrations, transaction processing and platforms that cannot go down.',
        'That shaped how I work: understand the problem before writing code, keep everything traceable and documented, and deliver in milestones so you always know where your project stands.',
      ],
      facts: [
        { value: '10+', label: 'years building software' },
        { value: '60%', label: 'faster deployments in my last role' },
        { value: '30%', label: 'lower cloud infrastructure cost' },
      ],
    },
    services: {
      title: 'What I can do for you',
      items: [
        { name: 'Custom web applications', desc: 'Admin systems, portals, learning platforms and dashboards, end to end.' },
        { name: 'APIs and backend', desc: 'Robust services with Node.js and .NET, integrations with other systems and background jobs.' },
        { name: 'Modern frontend', desc: 'Fast, clear interfaces with React and Angular that work on phone and desktop.' },
        { name: 'Databases', desc: 'Design, query optimization and large-volume migrations on PostgreSQL and SQL Server.' },
        { name: 'Cloud and deployment', desc: 'AWS and Azure, Docker, Kubernetes and automated deployments so releases are painless.' },
        { name: 'Fixing existing systems', desc: 'I fix bugs, improve performance and modernize applications you already run.' },
      ],
    },
    experience: {
      title: 'Experience',
      items: [
        {
          period: 'Present',
          company: 'Independent project',
          role: 'Full Stack Developer',
          desc: 'English-learning web platform for the Russian market, for a client in Australia. React and Node.js.',
        },
        {
          period: '2021 – present',
          company: 'Fundación de la Mujer',
          role: 'Software specialist',
          desc: 'Core banking migration, fault-tolerant asynchronous flows on AWS, transaction auditing and continuous deployment on Kubernetes.',
        },
        {
          period: '2020 – 2021',
          company: 'EO Datos y Documentos',
          role: 'Senior .NET Developer',
          desc: 'Led the migration and stabilization of 3 critical web applications and set quality standards that cut production bugs by 25%.',
        },
        {
          period: '2014 – 2020',
          company: 'SOLINT Soluciones Integradas',
          role: 'Software developer',
          desc: 'Nearly 7 years of custom software for corporate clients: development, rollout and support on Azure.',
        },
      ],
    },
    projects: {
      title: 'Selected projects',
      note: 'Projects built for companies are described without internal data, for confidentiality.',
      items: [
        {
          name: 'FincaMedir Rural',
          context: 'Own project, concept proposal',
          problem: 'Measure and organize farmland without expensive equipment or technical knowledge.',
          solution: 'Mobile app that calculates the area and perimeter of each plot by walking its boundary with the phone GPS, organizes the farm by land use (pasture, crops, corrals, forest) and exports PDF and KML reports for Google Earth. Includes a web platform where owners see all their farms and receive field measurements in sync.',
          stack: ['Mobile app', 'Web platform', 'GPS', 'Maps', 'PDF and KML reports'],
          video: '/fincamedir.mp4',
          poster: '/fincamedir.jpg',
        },
        {
          name: 'Loan portfolio migration to a new core banking system',
          context: 'Financial sector',
          problem: 'Move thousands of loans to the new core without losing a single record, in a short time window.',
          solution: 'Migration service with scheduled jobs and parallel processing that drastically cut processing time and guaranteed data integrity.',
          stack: ['C#', '.NET Core', 'SQL Server', 'AWS'],
        },
        {
          name: 'Traceable transaction processing',
          context: 'Financial sector',
          problem: 'Process operations asynchronously without losing any when a service fails.',
          solution: 'Event-driven flow with dead-letter queues and automatic retries, per-transaction auditing and centralized alerts. 60% faster deployments and 30% lower infrastructure cost.',
          stack: ['.NET', 'EventBridge', 'SQS', 'DynamoDB', 'Lambda', 'EKS'],
        },
        {
          name: 'English-learning platform',
          context: 'Ongoing freelance project',
          problem: 'Give Russian students a web platform to learn English online.',
          solution: 'Full stack development of the product, working remotely and directly with the client in Australia.',
          stack: ['React', 'Node.js'],
        },
      ],
    },
    contact: {
      title: 'Have a project in mind?',
      body: 'Tell me what you need and I will reply with a proposal: approach, timeline and cost.',
      name: 'Your name',
      email: 'Your email',
      message: 'Tell me about your project',
      send: 'Send message',
      sending: 'Sending…',
      sent: 'Message sent. I will get back to you soon.',
      error: 'The message could not be sent. Email me directly at',
      required: 'Fill in your name, a valid email and the message.',
      orEmail: 'You can also email me at',
    },
    footer: 'Built with React and Node.js.',
  },
};
