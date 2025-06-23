document.addEventListener('DOMContentLoaded', () => {
  const burgerInput = document.getElementById('burger');
  const navLinksContainer = document.getElementById('nav-links');
  const nav = document.querySelector('.nav-container');
  const header = document.querySelector('#navBarHeder');
  let prevScrollpos = window.pageYOffset;

  const buttons = document.querySelectorAll('.options button');
  const inputEmpresa = document.querySelector('#empresaInput');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      if (button.textContent.trim() === "Empresa") {
        inputEmpresa.classList.add('active');
      } else {
        inputEmpresa.classList.remove('active');
      }
    });
  });

  if (burgerInput && navLinksContainer) {
    burgerInput.addEventListener('change', () => {
      navLinksContainer.classList.toggle('active', burgerInput.checked);
    });
  }

  function setupAccessibility() {
    const menuItems = document.querySelectorAll('.nav-links a');
    menuItems.forEach(item => {
      item.setAttribute('role', 'menuitem');
      item.setAttribute('tabindex', '0');
    });
  }
  setupAccessibility();

  window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;

    if (prevScrollpos < currentScrollPos) {
      nav.classList.add('hide');
      header.classList.remove('active');
    } else if (currentScrollPos === 0) {
      nav.classList.remove('hide');
      header.classList.remove('active');
    } else {
      nav.classList.remove('hide');
      header.classList.add('active');
    }

    prevScrollpos = currentScrollPos;
    setActiveSectionOnScroll();

  });

  function setActiveSectionOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const allLinks = document.querySelectorAll('.nav-links a, .nav-links-menu a');
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        allLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  if (document.querySelector('section[id]')) {
    setActiveSectionOnScroll();
  }

  const counters = document.querySelectorAll(".counter");
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const speed = 200;

      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });

  showBenefit(0);
  showBenefit2(0);

  const btnParticular = document.getElementById('btnParticular');
  const btnEmpresa = document.getElementById('btnEmpresa');
  const empresaField = document.getElementById('empresaField');
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  if (btnParticular && btnEmpresa && empresaField) {
    btnParticular.addEventListener('click', function() {
      empresaField.style.display = 'none';
      this.setAttribute('aria-pressed', 'true');
      btnEmpresa.setAttribute('aria-pressed', 'false');
    });
    btnEmpresa.addEventListener('click', function() {
      empresaField.style.display = 'block';
      this.setAttribute('aria-pressed', 'true');
      btnParticular.setAttribute('aria-pressed', 'false');
    });
  }
  if (form && feedback) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      feedback.style.display = 'block';
      feedback.textContent = 'Enviando...';
      const submitBtn = form.querySelector('.submit-btn');
      submitBtn.disabled = true;

      const formData = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          feedback.textContent = 'Mensagem enviada com sucesso!';
          form.reset();
          document.getElementById('empresaInput').style.display = 'none';
        } else {
          feedback.textContent = 'Ocorreu um erro ao enviar. Tente novamente.';
        }
        submitBtn.disabled = false;
      })
      .catch(() => {
        feedback.textContent = 'Ocorreu um erro ao enviar. Tente novamente.';
        submitBtn.disabled = false;
      });
    });
  }

});


const modalContentT = {
  saude: {
    title: 'Saúde',
    title2: 'Clínica Corpo e Mente',
    title3: 'Serviços',
    text: `Consultas Médicas Gerais e Especialidades Clínicas
          Exames Laboratoriais e Diagnóstico por Imagem
          Psicologia, Psiquiatria e Terapias Integrativas
          Nutrição, Saúde Preventiva e Medicina Funcional
          Banco de Urgência com Atendimento Médico 24h
          Bloco Operatório para Cirurgias Eletivas e Ambulatoriais
          Medicina Ocupacional e Programas de Saúde Corporativa`,
    image: '../assets/logoBranco/C&M.svg'
  },
  hotel: {
    title: 'hotelaria',
    title2: 'Kalanaua',
    title3: 'Serviços',
    text: ` Hotelaria Urbana e de Negócios
            Turismo Ecológico e de Experiência
            Eventos Corporativos e Sociais
            Serviços de Restauração e Catering`,
    image: '../assets/logoBranco/Kalanaua.svg'

  },
  energia: {
    title: 'Energia',
    title2: 'MBT Energia',
    title3: 'Serviços',
    text: `Fornecimento e Montagem de Subestações e Linhas de Transmissão
            Instalação e Manutenção de Ramais de Baixa e Média Tensão
            Iluminação Pública e Privada
            Montagem e Manutenção de Postos de Transformação
            Soluções em Energias Renováveis
            Projetos de Eficiência Energética e Sustentabilidade`,
    image: '../assets/logoBranco/MBT Energia.svg'

  },
  ensino: {
    title: 'Educação Técnica',
    title2: 'Okukulanaua',
    title3: 'Serviços',
    text: `Ensino Dual: formação teórica aliada à prática em ambiente profissional real
            Laboratórios, oficinas e equipamentos atualizados
            Parcerias com empresas dos setores industrial, agrícola e energético
            Foco em empregabilidade, empreendedorismo e inovação técnica`,
    image: '../assets/logoBranco/Okukulanaua.svg'

  },
  agro: {
    title: 'Agro-indústria',
    title2: 'Quavi - Qualidade de Vida',
    title3: 'Serviços',
    text: `Produção, Abate e Transformação de Carne de Suíno
            Produção e Comercialização de Plantas Ornamentais
            Produção Agrícola e Comercialização de Legumes e Produtos Desidratados`,
    image: '../assets/logoBranco/Quavi.svg'
  },
  mecanica: {
    title: 'Mecânica Industrial',
    title2: 'Tecnology Africa',
    title3: 'Serviços',
    text: `Soluções em Mecânica e Tecnologia Industrial
            Manutenção de Máquinas Industriais e Agrícolas
            Manutenção e Reparação de Grupos Geradores
            Retificação e Usinagem de Peças (motores, cambotas, cilindros)
            Montagem e Instalação de Equipamentos Mecânicos
            Serviços de Manutenção Preventiva e Corretiva`,
    image: '../assets/logoBranco/Tecnology.svg'
  },
  consultoria: {
    title: 'Investimento e Consultoria',
    title2: 'Unione Consultoria',
    title3: 'Serviços',
    text: `Gestão de Investimentos Imobiliários
            Intermediação e Estruturação de Negócios
            Apoio à Internacionalização de Empresas
            Consultoria e Gestão Empresarial
            Incubação de Empresas (Ninho de Empresas)`,
    image: '../assets/logoBranco/Unione.svg'
  },
  metalurgia: {
    title: 'Metalurgia e Metalo-mecânica',
    title2: 'Metalangol',
    title3: 'Serviços',
    text: `Fabricação de Peças e Estruturas Metálicas
            Soldadura Técnica e Montagem
            Construções Metálicas e Caldeiraria
            Reparação e Manutenção Industrial`,
    image: '../assets/logoBranco/Metalangol.svg'
  },
  tecnologia: {
    title: 'Tecnologia e Inovação',
    title2: 'Fibra',
    title3: 'Serviços',
    text: `Implementação de Redes de Fibra Óptica
            Monitorização e Sistemas de Acesso
            Projetos Técnicos e Consultoria Especializada
            Redes Estruturadas e Cablagem Inteligente
            Sistemas de Rádio Frequência
            Infraestruturas de Suporte e Data Centers`,
    image: '../assets/logoBranco/Fibra.svg'
  },

  carpintaria: {
    title: 'Marcenaria e Carpintaria',
    title2: 'Mater',
    title3: 'Serviços',
    text: `Fabricação de Mobiliário por Medida
            Carpintaria de Interiores e Estruturas em Madeira
            Design e Montagem de Cozinhas, Closets e Escritórios
            Produção de Portas, Janelas, Tetos Falsos e Revestimentos
            Trabalhos de Acabamento Fino e Decoração em Madeira`,
                image: '../assets/logoBranco/Mater.svg'
  },

  cc: {
    title: 'construção Civil',
    title2: 'Infraone',
    title3: 'Serviços',
    text: `Construção de Infraestruturas Residenciais, Comerciais e Institucionais
            Execução de Projetos Industriais, Logísticos e Agroindustriais
            Obras Públicas de Urbanização, Redes Técnicas e Vias de Acesso
            Reabilitação Estrutural e Arquitetónica de Edifícios
            Planeamento, Coordenação Técnica e Gestão de Projetos de Obra`,
    image: '../assets/logoBranco/Infraone.svg'
  },
  cj: {
    title: 'Consultoria jurídica',
    title2: 'Integracons',
    title3: 'Serviços',
    text: `Direito Empresarial, Societário e Contratual
            Assessoria Jurídica em Investimentos e Parcerias
            Regularização Fundiária e Direito Imobiliário
            Direito Laboral e Contencioso Administrativo
            Consultoria Legal Preventiva e Gestão de Risco`,
    image: '../assets/logoBranco/Integracons.svg'
  }
};

function openModal(key) {
  const modal = document.getElementById('infoModal');
  document.getElementById('modalTitle').textContent = modalContentT[key].title;
  document.getElementById('modalTitle2').textContent = modalContentT[key].title2;
  document.getElementById('modalTitle3').textContent = modalContentT[key].title3;
  document.getElementById('modalText').textContent = modalContentT[key].text;
  document.getElementById('modalImage').src = modalContentT[key].image || '';
  modal.style.display = 'block';
}

function closeModal() {
  document.getElementById('infoModal').style.display = 'none';
}

window.onclick = function (event) {
  const modal = document.getElementById('infoModal');
  if (event.target == modal) {
    closeModal();
  }
}

const descriptions = [
  ["Propriedade regularizada: lotes registados e prontos para transmissão automática.",
    "Suporte técnico à implementação de projetos.",
    "Ambiente sustentável com planeamento ecológico e qualidade de vida no local de trabalho."
  ],
  [
    "Integração num projeto inovador, em crescimento contínuo.",
    "Potencial de retorno sólido em território com estrutura e visão de futuro."
  ],
  ["Acesso direto aos principais corredores logísticos regionais (terrestres, marítimos e aéreos).",
    "Conectividade multimodal: Porto do Namibe, Caminhos de Ferro de Moçâmedes e Aeroporto Internacional Agostinho Neto.",
    "Proximidade à fronteira com a Namíbia e aos principais centros urbanos de Angola."
  ],
  [
    "Lotes urbanizados para fins industriais, comerciais e habitacionais.",
    "Redes de saneamento, energia elétrica, fibra ótica e mobilidade interna.",
    "Centro de Distribuição Logístico com serviços digitais integrados.",
    "Segurança privada 24h.",
    "Hotelaria empresarial para acolhimento de equipas e parceiros."

  ]
];

function showBenefit(index) {
  const buttons = document.querySelectorAll('.tab-button');
  buttons.forEach(btn => btn.classList.remove('active'));
  buttons[index].classList.add('active');

  const list = document.getElementById('benefit-description');
  list.innerHTML = '<ul>' + descriptions[index].map(item => `<li>${item}</li>`).join('') + '</ul>';
}

const descriptions2 = [
  ["Redes de saneamento.",
    "Energia Elétrica.",
    "Abastecimento de Água.",
    "Recolha de resíduos.",
    "Internet.",
    "Fibra Ótica.",
    "Vias Internas.",
    "Segurança Privada 24h."
  ],
  [
    "Elaboração de projetos de arquitetura e engenharia personalizados.",
    "Segurança jurídica com lotes registados e transmissão automática de propriedade.",
    "Incubação de empresas nos primeiros anos de atividade.",
    "Formação de Técnicos Profissionais.",
    "Apoio na instalação e operação de unidades produtivas com agilidade e eficiência."
  ],
  [
    "Centro de Exposição Permanente para divulgação e comercialização de produtos e serviços das empresas instaladas.",
    "Centro de Distribuição Logístico"
  ],
  [
    "Espaços verdes e soluções de mobilidade interna.",
    "Qualidade de vida no ambiente de trabalho.",
    "Valorização contínua com um projeto inovador e em crescimento"

  ]
];
function showBenefit2(index) {
  const buttons2 = document.querySelectorAll('.tab-button2');
  buttons2.forEach(btn => btn.classList.remove('active'));
  buttons2[index].classList.add('active');

  const list2 = document.getElementById('benefit-description2');
  list2.innerHTML = '<ul>' + descriptions2[index].map(item => `<li>${item}</li>`).join('') + '</ul>';
}

