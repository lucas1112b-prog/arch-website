'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import SplitType from 'split-type';
import Lenis from 'lenis';
import { useLenis } from 'lenis/react';
import styles from './Projects.module.css';

// Project Images
import imgReserva from '../../assets/images/projects-section/reserva-da-pedra.png';
import imgViva from '../../assets/images/projects-section/viva-palmas.png';
import imgCosta from '../../assets/images/projects-section/costa-azul.png';
import imgMeridiem from '../../assets/images/projects-section/meridiem.png';
import imgMobem from '../../assets/images/projects-section/mobem.png';

// Secondary views for detail composition
import imgHero1 from '../../assets/images/images-big-hero/image-hero-01-big.png';
import imgHero2 from '../../assets/images/images-big-hero/image-hero-02-big.png';
import imgHero3 from '../../assets/images/images-big-hero/image-hero-03-big.png';
import imgHero4 from '../../assets/images/images-big-hero/image-hero-04-big.png';

// Additional architectural gallery views
import imgPre1 from '../../assets/images/preloader-logo-bg/preloader-bg-01.png';
import imgPre2 from '../../assets/images/preloader-logo-bg/preloader-bg-02.png';
import imgPre3 from '../../assets/images/preloader-logo-bg/preloader-bg-03.png';
import imgPre4 from '../../assets/images/preloader-logo-bg/preloader-bg-04.png';

import cornerIcon from '../../assets/icons/corner-triangle.svg';

gsap.registerPlugin(Flip, ScrollTrigger, CustomEase);

type FlipState = ReturnType<typeof Flip.getState>;

type Project = {
  id: string;
  title: string;
  image: StaticImageData;
  gallery: StaticImageData[];
  category: string;
  area: string;
  location: string;
  year: string;
  description: string;
  challenge: string;
  challengeList?: string[];
  strategy: string;
  solution: string;
};

const projects: Project[] = [
  {
    id: 'reserva-da-pedra',
    title: 'Club Reserva da Pedra',
    image: imgReserva,
    gallery: [imgHero1, imgHero2, imgHero3, imgPre1, imgPre2, imgHero4],
    category: 'Clube Residencial',
    area: '4.200 m²',
    location: 'Palhoça, SC',
    year: '2024',
    description:
      'Um clube residencial pensado para integrar lazer, paisagem e convivência em uma experiência contínua, unindo arquitetura e natureza em perfeita harmonia.',
    challenge:
      'Integrar lazer, paisagem e convivência em uma experiência contínua, unindo arquitetura contemporânea e natureza preservada sem criar barreiras visuais no terreno.',
    challengeList: [
      '01 - Pavilhão Social & Spa',
      '02 - Complexo Aquático Integrado',
      '03 - Espaço Gourmet & Lounge',
    ],
    strategy:
      'Adoção de planos horizontais e balanços estruturais que emolduram a vegetação, com transparência contínua que dissolve os limites entre áreas internas e externas.',
    solution:
      'Estrutura metálica aparente com madeira certificada e concreto arquitetônico, proporcionando conforto bioclimático e baixa manutenção ao longo do tempo.',
  },
  {
    id: 'viva-palmas',
    title: 'Vivá Palmas do Arvoredo',
    image: imgViva,
    gallery: [imgHero3, imgHero4, imgHero2, imgPre3, imgPre4, imgHero1],
    category: 'Residencial Multifamiliar',
    area: '6.800 m²',
    location: 'Governador Celso Ramos, SC',
    year: '2023',
    description:
      'Arquitetura contemporânea que valoriza a relação entre os espaços de morar e a paisagem natural, com volumetria pura e linhas horizontais elegantes.',
    challenge:
      'Valorizar a relação entre os espaços de morar e a orla marítima, respeitando a escala da vila costeira e garantindo ventilação cruzada em todas as unidades.',
    challengeList: [
      '01 - Tipologias Flexíveis com Vista Mar',
      '02 - Áreas Comuns com Lazer Panorâmico',
      '03 - Conexão Direta com a Natureza',
    ],
    strategy:
      'Composição volumétrica em blocos articulados com grandes varandas protegidas por brises verticais, filtrando a insolação e conferindo leveza às fachadas.',
    solution:
      'Concreto pigmentado, esquadrias de alta atenuação acústica e sistemas solares passivos para máxima eficiência energética contínua.',
  },
  {
    id: 'costa-azul',
    title: 'Costa Azul Clube',
    image: imgCosta,
    gallery: [imgHero2, imgHero1, imgHero4, imgPre2, imgPre1, imgHero3],
    category: 'Complexo de Lazer',
    area: '3.500 m²',
    location: 'Itapema, SC',
    year: '2023',
    description:
      'Um projeto de lazer e bem-estar que organiza diferentes ritmos de uso em uma composição única, com iluminação natural abundante e transparência.',
    challenge:
      'Organizar diferentes ritmos de uso e práticas esportivas em um terreno de topografia íngreme, conectando cotas de nível sem fragmentar a paisagem.',
    challengeList: [
      '01 - Centro Esportivo & Piscinas',
      '02 - Restaurante Panorâmico',
      '03 - Mirante & Solarium',
    ],
    strategy:
      'Terraços escalonados integrados ao desnível natural, reduzindo movimentações de terra e abrindo visuais desimpedidas para o horizonte.',
    solution:
      'Pedra natural local combinada a elementos vazados de concreto e coberturas verdes para retenção pluvial e isolamento térmico.',
  },
  {
    id: 'meridiem',
    title: 'Meridiem',
    image: imgMeridiem,
    gallery: [imgHero4, imgHero3, imgHero1, imgPre4, imgPre3, imgHero2],
    category: 'Edifício Corporativo',
    area: '8.400 m²',
    location: 'Florianópolis, SC',
    year: '2022',
    description:
      'Precisão técnica e materialidade para criar uma identidade marcante em cada escala do projeto, unindo eficiência energética e estética refinada.',
    challenge:
      'Criar uma sede corporativa de vanguarda que responda às demandas de empresas de tecnologia, aliando alta flexibilidade espacial e certificação ambiental.',
    challengeList: [
      '01 - Lajes Corporativas Livres de Pilares',
      '02 - Rooftop para Eventos & Networking',
      '03 - Certificação LEED Gold',
    ],
    strategy:
      'Concentração das circulações e prumadas em um núcleo rígido central, liberando os quatro lados para iluminação natural e vista 360° da cidade.',
    solution:
      'Fachada ventilada cerâmica, vidros seletivos de controle térmico e reaproveitamento integral de águas pluviais.',
  },
  {
    id: 'mobem',
    title: 'Mobem Alves de Brito',
    image: imgMobem,
    gallery: [imgHero1, imgHero3, imgHero2, imgPre1, imgPre4, imgHero4],
    category: 'Edifício Residencial',
    area: '5.100 m²',
    location: 'Florianópolis, SC',
    year: '2022',
    description:
      'Um edifício conectado à cidade, com soluções eficientes para uma nova experiência urbana e arquitetura focada no conforto acústico e térmico.',
    challenge:
      'Inserir um edifício residencial moderno no centro urbano consolidado, ativando a calçada e oferecendo silêncio e conforto térmico de excelência.',
    challengeList: [
      '01 - Fachada Ativa no Nível da Rua',
      '02 - Apartamentos com Varandas Vivas',
      '03 - Hub de Convivência & Coworking',
    ],
    strategy:
      'Passeio público ampliado com recuo convidativo, integrado a uma torre elegante ritmada por floreiras que criam microclimas nas varandas.',
    solution:
      'Modelagem integral em BIM com sistemas industrializados, vidros laminados acústicos e infraestrutura para mobilidade elétrica.',
  },
];

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<'challenge' | 'strategy' | 'solution' | null>('challenge');
  const activeProject = projects.find((p) => p.id === activeProjectId) ?? null;
  const activeIndex = projects.findIndex((p) => p.id === activeProjectId);
  const nextIndex = activeIndex !== -1 ? (activeIndex + 1) % projects.length : 0;
  const nextProject = projects[nextIndex];
  const [previewProjectId, setPreviewProjectId] = useState(projects[0].id);
  const [incomingPreviewProjectId, setIncomingPreviewProjectId] = useState<string | null>(null);

  const previewProject = projects.find((project) => project.id === previewProjectId) ?? projects[0];
  const incomingPreviewProject = incomingPreviewProjectId
    ? projects.find((project) => project.id === incomingPreviewProjectId) ?? null
    : null;

  const toggleSection = (section: 'challenge' | 'strategy' | 'solution') => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const lenis = useLenis();

  const itemPreviewRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const projectsSectionRef = useRef<HTMLElement>(null);
  const previewStageRef = useRef<HTMLDivElement>(null);
  const previewCurrentLayerRef = useRef<HTMLDivElement>(null);
  const previewIncomingLayerRef = useRef<HTMLDivElement>(null);
  const previewTransitionRef = useRef<gsap.core.Timeline | null>(null);
  const previewTransitionFrameRef = useRef<number | null>(null);
  const previewProjectIdRef = useRef(projects[0].id);
  const incomingPreviewProjectIdRef = useRef<string | null>(null);
  const hoveredProjectIdRef = useRef(projects[0].id);
  const previewPositionTweenRef = useRef<gsap.core.Tween | null>(null);
  const previewHasEnteredRef = useRef(false);
  const previewIsCatchingUpRef = useRef(false);
  const lastPointerYRef = useRef<number | null>(null);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalBackdropRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const modalImageRef = useRef<HTMLDivElement>(null);
  const imagesColumnRef = useRef<HTMLDivElement>(null);
  const imagesContentRef = useRef<HTMLDivElement>(null);
  const gallerySlotsRef = useRef<HTMLDivElement[]>([]);
  const modalDetailsRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const modalLenisRef = useRef<Lenis | null>(null);

  const pendingFlipRef = useRef<{ state: FlipState; projectId: string } | null>(null);
  const previewSizeRef = useRef({ width: 360, height: 360 * (9 / 16) });

  useLayoutEffect(() => {
    const section = projectsSectionRef.current;
    const firstProject = section?.querySelector<HTMLElement>(`.${styles.projectItem}`);
    const stage = previewStageRef.current;
    if (!section || !firstProject || !stage) return;

    const syncPreviewSize = () => {
      const height = Math.max(40, firstProject.offsetHeight - 24);
      const width = height * (16 / 9);
      previewSizeRef.current = { width, height };
      section.style.setProperty('--project-preview-width', `${width}px`);
      section.style.setProperty('--project-preview-height', `${height}px`);
      stage.style.removeProperty('width');
      stage.style.removeProperty('height');

      const currentPointerY = lastPointerYRef.current;
      if (currentPointerY !== null) {
        const sectionRect = section.getBoundingClientRect();
        const nextY = currentPointerY - sectionRect.top - height / 2;
        const maxY = Math.max(24, section.offsetHeight - height - 24);
        stage.style.top = `${Math.min(Math.max(24, nextY), maxY)}px`;
        return;
      }

      const initialY = Math.max(
        24,
        firstProject.offsetTop + firstProject.offsetHeight / 2 - height / 2
      );
      stage.style.top = `${initialY}px`;
    };

    syncPreviewSize();
    const resizeObserver = new ResizeObserver(syncPreviewSize);
    resizeObserver.observe(firstProject);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      previewTransitionRef.current?.kill();
      previewPositionTweenRef.current?.kill();
      if (previewTransitionFrameRef.current !== null) {
        cancelAnimationFrame(previewTransitionFrameRef.current);
      }
    };
  }, []);

  const transitionPreview = useCallback((projectId: string) => {
    hoveredProjectIdRef.current = projectId;

    if (projectId === previewProjectIdRef.current) {
      previewTransitionRef.current?.kill();
      if (previewTransitionFrameRef.current !== null) {
        cancelAnimationFrame(previewTransitionFrameRef.current);
        previewTransitionFrameRef.current = null;
      }
      incomingPreviewProjectIdRef.current = null;
      setIncomingPreviewProjectId(null);
      if (previewCurrentLayerRef.current) {
        gsap.set(previewCurrentLayerRef.current, { opacity: 1, scale: 1 });
      }
      return;
    }

    if (projectId === incomingPreviewProjectIdRef.current) return;

    previewTransitionRef.current?.kill();
    if (previewTransitionFrameRef.current !== null) {
      cancelAnimationFrame(previewTransitionFrameRef.current);
      previewTransitionFrameRef.current = null;
    }

    incomingPreviewProjectIdRef.current = projectId;
    setIncomingPreviewProjectId(projectId);

    previewTransitionFrameRef.current = requestAnimationFrame(() => {
      previewTransitionFrameRef.current = null;
      if (
        hoveredProjectIdRef.current !== projectId ||
        incomingPreviewProjectIdRef.current !== projectId
      ) {
        return;
      }

      const currentLayer = previewCurrentLayerRef.current;
      const incomingLayer = previewIncomingLayerRef.current;
      if (!currentLayer || !incomingLayer) return;

      gsap.set(currentLayer, { opacity: 1, scale: 1 });
      gsap.set(incomingLayer, { opacity: 0, scale: 0.93 });

      const transition = gsap.timeline({
        onComplete: () => {
          if (
            hoveredProjectIdRef.current !== projectId ||
            incomingPreviewProjectIdRef.current !== projectId
          ) {
            return;
          }

          previewProjectIdRef.current = projectId;
          incomingPreviewProjectIdRef.current = null;
          setPreviewProjectId(projectId);
          setIncomingPreviewProjectId(null);
        },
      });

      transition.to(incomingLayer, {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: 'power2.out',
      });

      previewTransitionRef.current = transition;
    });
  }, []);
  const positionPreviewAt = useCallback((clientY: number, fromPointer: boolean) => {
    const section = projectsSectionRef.current;
    const stage = previewStageRef.current;
    if (!section || !stage) return;

    const sectionRect = section.getBoundingClientRect();
    const previewHeight = previewSizeRef.current.height;
    const nextY = clientY - sectionRect.top - previewHeight / 2;
    const maxY = Math.max(24, section.offsetHeight - previewHeight - 24);
    const clampedY = Math.min(Math.max(24, nextY), maxY);

    if (fromPointer && !previewHasEnteredRef.current) {
      previewHasEnteredRef.current = true;
      previewIsCatchingUpRef.current = true;
    }

    if (previewIsCatchingUpRef.current) {
      previewPositionTweenRef.current?.kill();
      previewPositionTweenRef.current = gsap.to(stage, {
        top: clampedY,
        duration: 0.35,
        ease: 'power3.out',
        overwrite: true,
        onComplete: () => {
          previewIsCatchingUpRef.current = false;
          previewPositionTweenRef.current = null;
        },
      });
      return;
    }

    if (!fromPointer) {
      previewPositionTweenRef.current?.kill();
      previewPositionTweenRef.current = gsap.to(stage, {
        top: clampedY,
        duration: 0.12,
        ease: 'power2.out',
        overwrite: true,
        onComplete: () => {
          previewPositionTweenRef.current = null;
        },
      });
      return;
    }

    previewPositionTweenRef.current?.kill();
    previewPositionTweenRef.current = null;
    stage.style.top = `${clampedY}px`;
  }, []);

  const updatePreviewPosition = (event: React.PointerEvent<HTMLElement>) => {
    lastPointerYRef.current = event.clientY;
    positionPreviewAt(event.clientY, true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (lastPointerYRef.current === null) return;
      positionPreviewAt(lastPointerYRef.current, false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [positionPreviewAt]);

  const isAnimatingRef = useRef(false);
  // Mobile scroll trigger image previews
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(max-width: 768px)', () => {
      const items = document.querySelectorAll(`.${styles.projectItem}`);
      items.forEach((item) => {
        const imgWrapper = item.querySelector(`.${styles.imagePreviewWrapper}`);
        if (!imgWrapper) return;

        gsap.fromTo(
          imgWrapper,
          { autoAlpha: 0, scale: 0.9 },
          {
            autoAlpha: 1,
            scale: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);


  // Lock body scroll and pause Lenis when modal is active
  useEffect(() => {
    if (activeProjectId) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [activeProjectId, lenis]);

  // Independent smooth scroll (Lenis) for modal images column
  useEffect(() => {
    if (!activeProjectId || !imagesColumnRef.current || !imagesContentRef.current) return;

    const modalLenis = new Lenis({
      wrapper: imagesColumnRef.current,
      content: imagesContentRef.current,
      eventsTarget: imagesColumnRef.current,
      smoothWheel: true,
      duration: 1.2,
      lerp: 0.08,
      overscroll: false,
    });

    modalLenisRef.current = modalLenis;

    const updateLenis = (time: number) => {
      modalLenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    return () => {
      gsap.ticker.remove(updateLenis);
      modalLenis.destroy();
      modalLenisRef.current = null;
    };
  }, [activeProjectId]);

  // Sequential Timeline Animation:
  // 1. A imagem se desloca para o topo esquerdo (Flip)
  // 2. As imagens secundárias abaixo aparecem
  // 3. A barra lateral das infos entra por OPACITY (sem slide) e com animação de SPLIT nos textos
  useLayoutEffect(() => {
    if (!pendingFlipRef.current) return;
    const { state, projectId } = pendingFlipRef.current;
    pendingFlipRef.current = null;

    if (activeProjectId && modalImageRef.current) {
      CustomEase.create('osmo-ease', '0.22, 1, 0.36, 1');

      const sourceWrapper = itemPreviewRefs.current[projectId];
      if (sourceWrapper) {
        gsap.set(sourceWrapper, { opacity: 0 });
      }

      // Ensure left images column starts with overflow visible (no clipping during flip) and at top
      if (imagesColumnRef.current) {
        imagesColumnRef.current.classList.remove(styles.scrollable);
        imagesColumnRef.current.scrollTop = 0;
      }

      // Initial state of gallery elements and close button
      if (gallerySlotsRef.current.length > 0) {
        gsap.set(gallerySlotsRef.current, { autoAlpha: 0, y: 30, scale: 0.98 });
      }
      if (closeBtnRef.current) {
        gsap.set(closeBtnRef.current, { autoAlpha: 0, scale: 0.85 });
      }

      // Setup split text on ALL text elements in modal details
      const splits: SplitType[] = [];

      if (modalDetailsRef.current) {
        // Only opacity - NO slide!
        gsap.set(modalDetailsRef.current, { autoAlpha: 0 });

        const selectors = [
          `.${styles.infosCategory}`,
          `.${styles.infosCounter}`,
          `.${styles.projectTitleModal}`,
          `.${styles.metaRow} span:not(.${styles.dot})`,
          `.${styles.accordionTitle}`,
          `.${styles.accordionText}`,
          `.${styles.accordionListItem}`,
        ];

        const textEls = modalDetailsRef.current.querySelectorAll<HTMLElement>(selectors.join(', '));

        textEls.forEach((el) => {
          const s = new SplitType(el, { types: 'lines,words' });
          gsap.set(s.lines, { overflow: 'hidden' });
          gsap.set(s.words, { yPercent: 115 });
          splits.push(s);
        });
      }

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });

      // Semi-transparent backdrop fades in softly
      if (modalBackdropRef.current) {
        tl.fromTo(
          modalBackdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: 'power2.out' },
          0
        );
      }

      // ETAPA 1: Primeiro a imagem se desloca (Flip) - Inicia em 0s no timeline
      const flipAnim = Flip.from(state, {
        targets: modalImageRef.current,
        duration: 0.75,
        ease: 'power3.inOut',
        absolute: true,
        zIndex: 999999,
        onComplete: () => {
          // Enable independent scrolling ONLY after the floating image has safely landed
          if (imagesColumnRef.current) {
            imagesColumnRef.current.classList.add(styles.scrollable);
          }
        },
      });

      tl.add(flipAnim, 0);

      // Close button fades in on the left
      if (closeBtnRef.current) {
        tl.to(
          closeBtnRef.current,
          { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
          '-=0.45'
        );
      }

      // ETAPA 2: Imagens da galeria aparecem simultaneamente com o pouso da imagem
      if (gallerySlotsRef.current.length > 0) {
        tl.to(
          gallerySlotsRef.current,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.35,
            stagger: 0.04,
            ease: 'power2.out',
          },
          '-=0.4'
        );
      }

      // ETAPA 3: A barra lateral das infos entra sem demora (em paralelo ao landing)
      if (modalDetailsRef.current) {
        tl.to(
          modalDetailsRef.current,
          {
            autoAlpha: 1,
            duration: 0.28,
            ease: 'power2.out',
            onStart: () => {
              if (modalDetailsRef.current) {
                modalDetailsRef.current.style.pointerEvents = 'auto';
              }
            },
          },
          '<0.05'
        );

        const allWords = splits.flatMap((s) => s.words || []);

        if (allWords.length > 0) {
          tl.to(
            allWords,
            {
              yPercent: 0,
              duration: 0.45,
              stagger: 0.008,
              ease: 'power3.out',
            },
            '<'
          );
        }

        const nonTextEls = modalDetailsRef.current.querySelectorAll<HTMLElement>(
          `.${styles.dot}, .${styles.accordionIcon}, .${styles.accordionItem}, .${styles.nextProjectCard}`
        );
        if (nonTextEls.length > 0) {
          tl.fromTo(
            nonTextEls,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.3, ease: 'power2.out', stagger: 0.03 },
            '<0.05'
          );
        }

        if (marqueeRef.current) {
          tl.fromTo(
            marqueeRef.current,
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' },
            '<0.1'
          );
        }
      }

      return () => {
        splits.forEach((s) => s.revert());
      };
    }
  }, [activeProjectId]);

  const selectProject = (projectId: string) => {
    if (isAnimatingRef.current || activeProjectId === projectId) return;

    const sourceWrapper = itemPreviewRefs.current[projectId];
    if (!sourceWrapper) {
      setActiveProjectId(projectId);
      return;
    }

    isAnimatingRef.current = true;

    // Keep the global preview and Flip source invisible until the modal is ready.
    if (previewStageRef.current) {
      gsap.set(previewStageRef.current, { autoAlpha: 0 });
    }

    // Add flipping class so CSS transitions don't conflict with Flip.
    // Capture the source geometry without flashing it in its original position.
    sourceWrapper.classList.add(styles.flipping);
    gsap.set(sourceWrapper, { opacity: 0 });
    const state = Flip.getState(sourceWrapper);

    pendingFlipRef.current = { state, projectId };
    setOpenSection('challenge');
    setActiveProjectId(projectId);
    if (imagesColumnRef.current) {
      imagesColumnRef.current.classList.remove(styles.scrollable);
      imagesColumnRef.current.scrollTop = 0;
    }
  };

  const closeProject = useCallback(() => {
    if (!activeProjectId || isAnimatingRef.current) return;

    const modalImg = modalImageRef.current;
    const sourceWrapper = itemPreviewRefs.current[activeProjectId];

    if (!modalImg || !sourceWrapper) {
      setActiveProjectId(null);
      if (previewStageRef.current) {
        gsap.set(previewStageRef.current, { clearProps: 'opacity,visibility' });
      }
      return;
    }

    isAnimatingRef.current = true;
    sourceWrapper.classList.add(styles.flipping);

    // Reset imagesColumn scroll and remove scrollable (overflow visible) before capturing Flip state
    // so modalImg is never clipped on its return flight!
    if (imagesColumnRef.current) {
      modalLenisRef.current?.scrollTo(0, { immediate: true });
      imagesColumnRef.current.classList.remove(styles.scrollable);
      imagesColumnRef.current.scrollTop = 0;
    }

    // Capture state of "imagem deslocada" before any animation
    const state = Flip.getState(modalImg);

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveProjectId(null);
        isAnimatingRef.current = false;
        sourceWrapper.classList.remove(styles.flipping);
        gsap.set(sourceWrapper, { clearProps: 'all' });
        if (previewStageRef.current) {
          gsap.set(previewStageRef.current, { clearProps: 'opacity,visibility' });
        }
      },
    });

    // 1. Sidebar fecha por opacity (sem slide)
    if (modalDetailsRef.current) {
      modalDetailsRef.current.style.pointerEvents = 'none';
      tl.to(modalDetailsRef.current, {
        autoAlpha: 0,
        duration: 0.28,
        ease: 'power2.in',
      });
    }

    // 2. Imagens da galeria desaparecem
    if (gallerySlotsRef.current.length > 0) {
      tl.to(
        gallerySlotsRef.current,
        {
          autoAlpha: 0,
          y: 20,
          duration: 0.25,
          ease: 'power2.in',
          stagger: 0.03,
        },
        '-=0.15'
      );
    }

    // 3. Botão de fechar e fundo suavizam
    if (closeBtnRef.current) {
      tl.to(closeBtnRef.current, { autoAlpha: 0, duration: 0.2 }, '-=0.2');
    }
    if (marqueeRef.current) {
      tl.to(marqueeRef.current, { autoAlpha: 0, y: 24, duration: 0.2 }, '-=0.2');
    }
    if (modalBackdropRef.current) {
      tl.to(modalBackdropRef.current, { opacity: 0, duration: 0.35, ease: 'power2.inOut' }, '-=0.1');
    }

    // 4. CRITICAL FIX: Hide modalImg IMMEDIATELY so no duplicate copy is left behind!
    tl.add(() => {
      gsap.set(modalImg, { autoAlpha: 0, visibility: 'hidden' });
      gsap.set(sourceWrapper, { autoAlpha: 1, visibility: 'visible' });
    }, '-=0.15');

    // 5. Flip do sourceWrapper de volta para a lista (apenas 1 imagem visível!)
    const flipBack = Flip.from(state, {
      targets: sourceWrapper,
      duration: 0.8,
      ease: 'power3.inOut',
      absolute: true,
      zIndex: 999999,
    });

    tl.add(flipBack, '-=0.15');
  }, [activeProjectId]);

  const navigateProject = (direction: number) => {
    if (isAnimatingRef.current || activeIndex === -1) return;

    const nextIndex = (activeIndex + direction + projects.length) % projects.length;
    const nextProject = projects[nextIndex];

    const elementsToCrossfade = [
      modalImageRef.current,
      ...gallerySlotsRef.current,
      modalDetailsRef.current,
    ].filter(Boolean);

    if (elementsToCrossfade.length > 0) {
      isAnimatingRef.current = true;
      gsap.to(elementsToCrossfade, {
        opacity: 0,
        y: direction > 0 ? -12 : 12,
        duration: 0.2,
        onComplete: () => {
          if (imagesColumnRef.current) {
            imagesColumnRef.current.scrollTop = 0;
            modalLenisRef.current?.scrollTo(0, { immediate: true });
          }
          setActiveProjectId(nextProject.id);
          setOpenSection('challenge');
          gsap.fromTo(
            elementsToCrossfade,
            { opacity: 0, y: direction > 0 ? 12 : -12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: 'power2.out',
              onComplete: () => {
                isAnimatingRef.current = false;
              },
            }
          );
        },
      });
    } else {
      setActiveProjectId(nextProject.id);
      setOpenSection('challenge');
    }
  };

  // Keyboard navigation & ESC to close
  useEffect(() => {
    if (!activeProjectId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeProject();
      } else if (event.key === 'ArrowRight') {
        navigateProject(1);
      } else if (event.key === 'ArrowLeft') {
        navigateProject(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProjectId, closeProject, navigateProject]);

  return (
    <section
      ref={projectsSectionRef}
      className={`${styles.projectsSection} ${activeProject ? styles.sectionModalActive : ''}`}
      onPointerEnter={() => {
        previewHasEnteredRef.current = false;
      }}
      onPointerLeave={() => {
        previewHasEnteredRef.current = false;
        previewIsCatchingUpRef.current = false;
        lastPointerYRef.current = null;
        previewPositionTweenRef.current?.kill();
        previewPositionTweenRef.current = null;
      }}
    >
      <div className={styles.cornerIcon}>
        <Image src={cornerIcon} alt="" width={50} height={50} />
      </div>

      <div
        ref={previewStageRef}
        className={`${styles.previewStage} ${activeProject ? styles.previewStageHidden : ''}`}
        aria-hidden="true"
      >
        <div ref={previewCurrentLayerRef} className={styles.previewLayer}>
          <Image
            src={previewProject.image}
            alt=""
            fill
            className={styles.previewImage}
            sizes="360px"
          />
        </div>
        {incomingPreviewProject && (
          <div ref={previewIncomingLayerRef} className={styles.previewLayer}>
            <Image
              src={incomingPreviewProject.image}
              alt=""
              fill
              className={styles.previewImage}
              sizes="360px"
            />
          </div>
        )}
      </div>

      <header className={styles.header}>
        <div className={styles.label}>Nossos Projetos</div>
        <button className={styles.viewAllBtn} type="button">
          Ver Todos
        </button>
      </header>

      {/* Clean vertical list without numbers beside texts */}
      <div className={styles.projectsList}>
        {projects.map((project, idx) => {
          const isActive = project.id === activeProjectId;

          return (
            <article
              key={project.id}
              className={`${styles.projectItem} ${isActive ? styles.activeItem : ''}`}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              onClick={() => selectProject(project.id)}
              onPointerEnter={() => transitionPreview(project.id)}
              onPointerMove={updatePreviewPosition}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  selectProject(project.id);
                }
              }}
            >
              <div className={styles.projectHeading}>
                <h3 className={styles.projectTitle}>
                  <span className={styles.projectTitleMask}>
                    <span className={styles.projectTitleTrack}>
                      <span className={styles.projectTitleText}>{project.title}</span>
                      <span className={styles.projectTitleText} aria-hidden="true">{project.title}</span>
                    </span>
                  </span>
                  <span className={styles.projectArrowBox} aria-hidden="true">
                    <svg
                      className={styles.projectArrowIcon}
                      viewBox="23.5 26.5 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24.7298 44.0264L39.5034 29.2529H26.8403L26.7318 27.5524H42.4098V43.2304L40.7094 43.1219V30.4589L25.9358 45.2324L24.7298 44.0264Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </h3>
              </div>

              {/* Source image preview in list */}
              <div
                ref={(el) => {
                  itemPreviewRefs.current[project.id] = el;
                }}
                data-flip-id={`project-flip-img-${project.id}`}
                className={`${styles.imagePreviewWrapper} ${styles.imagePreviewSource}`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  className={styles.imagePreview}
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw, 450px"
                />
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal matching user reference layout */}
      {activeProject && (
        <div
          className={styles.modalOverlay}
          ref={modalOverlayRef}
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.modalBackdrop}
            ref={modalBackdropRef}
            onClick={closeProject}
            aria-hidden="true"
          />

          <div className={styles.modalContainer}>
            {/* Floating Close Button in the UPPER LEFT - Clean minimalist cross */}
            <button
              type="button"
              className={styles.closeBtnLeft}
              ref={closeBtnRef}
              onClick={closeProject}
              aria-label="Fechar"
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                <line x1="1.5" y1="1.5" x2="10.5" y2="10.5" />
                <line x1="10.5" y1="1.5" x2="1.5" y2="10.5" />
              </svg>
            </button>

            {/* Left Column: Independently scrollable images gallery with smooth scroll */}
            <div
              className={styles.imagesColumn}
              ref={imagesColumnRef}
              data-lenis-prevent
            >
              <div className={styles.imagesColumnContent} ref={imagesContentRef}>
                {/* Top slot: "imagem deslocada" (Target for Flip) */}
              <div className={styles.displacedImageSlot}>
                <div
                  ref={modalImageRef}
                  data-flip-id={`project-flip-img-${activeProject.id}`}
                  className={styles.displacedImageWrapper}
                >
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    className={styles.projectImage}
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 75vw"
                  />
                </div>
              </div>

              {/* Gallery Row 1: Two images side-by-side */}
              <div className={styles.galleryRow}>
                <div
                  ref={(el) => {
                    if (el) gallerySlotsRef.current[0] = el;
                  }}
                  className={styles.gallerySlotHalf}
                >
                  <Image
                    src={activeProject.gallery[0]}
                    alt={`${activeProject.title} - Vista 2`}
                    className={styles.projectImage}
                    fill
                    sizes="(max-width: 900px) 50vw, 38vw"
                  />
                </div>
                <div
                  ref={(el) => {
                    if (el) gallerySlotsRef.current[1] = el;
                  }}
                  className={styles.gallerySlotHalf}
                >
                  <Image
                    src={activeProject.gallery[1]}
                    alt={`${activeProject.title} - Vista 3`}
                    className={styles.projectImage}
                    fill
                    sizes="(max-width: 900px) 50vw, 38vw"
                  />
                </div>
              </div>

              {/* Gallery Slot: Wide panorama view */}
              <div
                ref={(el) => {
                  if (el) gallerySlotsRef.current[2] = el;
                }}
                className={styles.gallerySlotFull}
              >
                <Image
                  src={activeProject.gallery[2]}
                  alt={`${activeProject.title} - Vista Panorâmica`}
                  className={styles.projectImage}
                  fill
                  sizes="(max-width: 900px) 100vw, 75vw"
                />
              </div>

              {/* Gallery Row 2: Two images side-by-side */}
              <div className={styles.galleryRow}>
                <div
                  ref={(el) => {
                    if (el) gallerySlotsRef.current[3] = el;
                  }}
                  className={styles.gallerySlotHalf}
                >
                  <Image
                    src={activeProject.gallery[3]}
                    alt={`${activeProject.title} - Detalhe 1`}
                    className={styles.projectImage}
                    fill
                    sizes="(max-width: 900px) 50vw, 38vw"
                  />
                </div>
                <div
                  ref={(el) => {
                    if (el) gallerySlotsRef.current[4] = el;
                  }}
                  className={styles.gallerySlotHalf}
                >
                  <Image
                    src={activeProject.gallery[4]}
                    alt={`${activeProject.title} - Detalhe 2`}
                    className={styles.projectImage}
                    fill
                    sizes="(max-width: 900px) 50vw, 38vw"
                  />
                </div>
              </div>

              {/* Gallery Slot: Closing full-width view */}
              <div
                ref={(el) => {
                  if (el) gallerySlotsRef.current[5] = el;
                }}
                className={styles.gallerySlotFull}
              >
                <Image
                  src={activeProject.gallery[5]}
                  alt={`${activeProject.title} - Atmosfera`}
                  className={styles.projectImage}
                  fill
                  sizes="(max-width: 900px) 100vw, 75vw"
                />
              </div>
            </div>
          </div>

          {/* Right 28vw: "infos" (solid black sidebar) */}
          <aside className={styles.infosColumn} ref={modalDetailsRef}>
              <div className={styles.infosMainContent}>
                <div className={styles.infosHeader}>
                  <span className={styles.infosCategory}>{activeProject.category}</span>
                  <span className={styles.infosCounter}>
                    {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </span>
                </div>

                <div className={styles.infosBody}>
                  <h2 className={styles.projectTitleModal}>{activeProject.title}</h2>
                  <div className={styles.metaRow}>
                    <span>{activeProject.location}</span>
                    <span className={styles.dot}>•</span>
                    <span>{activeProject.year}</span>
                    <span className={styles.dot}>•</span>
                    <span>{activeProject.area}</span>
                  </div>
                  {/* Accordion structure matching user reference image */}
                  <div className={styles.accordionContainer}>
                    {/* 1. The Challenge (default open with minus icon) */}
                    <div className={styles.accordionItem}>
                      <button
                        type="button"
                        className={styles.accordionHeader}
                        onClick={() => toggleSection('challenge')}
                        aria-expanded={openSection === 'challenge'}
                      >
                        <span className={styles.accordionTitle}>The Challenge</span>
                        <span className={styles.accordionIcon}>
                          {openSection === 'challenge' ? (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                          ) : (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="16" />
                              <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                          )}
                        </span>
                      </button>
                      {openSection === 'challenge' && (
                        <div className={styles.accordionContent}>
                          <p className={styles.accordionText}>{activeProject.challenge}</p>
                          {activeProject.challengeList && activeProject.challengeList.length > 0 && (
                            <ul className={styles.accordionList}>
                              {activeProject.challengeList.map((item, i) => (
                                <li key={i} className={styles.accordionListItem}>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 2. The Strategy */}
                    <div className={styles.accordionItem}>
                      <button
                        type="button"
                        className={styles.accordionHeader}
                        onClick={() => toggleSection('strategy')}
                        aria-expanded={openSection === 'strategy'}
                      >
                        <span className={styles.accordionTitle}>The Strategy</span>
                        <span className={styles.accordionIcon}>
                          {openSection === 'strategy' ? (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                          ) : (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="16" />
                              <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                          )}
                        </span>
                      </button>
                      {openSection === 'strategy' && (
                        <div className={styles.accordionContent}>
                          <p className={styles.accordionText}>{activeProject.strategy}</p>
                        </div>
                      )}
                    </div>

                    {/* 3. The Solution */}
                    <div className={styles.accordionItem}>
                      <button
                        type="button"
                        className={styles.accordionHeader}
                        onClick={() => toggleSection('solution')}
                        aria-expanded={openSection === 'solution'}
                      >
                        <span className={styles.accordionTitle}>The Solution</span>
                        <span className={styles.accordionIcon}>
                          {openSection === 'solution' ? (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                          ) : (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="16" />
                              <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                          )}
                        </span>
                      </button>
                      {openSection === 'solution' && (
                        <div className={styles.accordionContent}>
                          <p className={styles.accordionText}>{activeProject.solution}</p>
                          <div className={styles.specsMiniGrid}>
                            <div className={styles.specMini}>
                              <span className={styles.specMiniLabel}>ÁREA CONSTRUÍDA</span>
                              <span className={styles.specMiniValue}>{activeProject.area}</span>
                            </div>
                            <div className={styles.specMini}>
                              <span className={styles.specMiniLabel}>ANO DE CONCLUSÃO</span>
                              <span className={styles.specMiniValue}>{activeProject.year}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card "Próximo Projeto" separado e alinhado sozinho ao bottom */}
              {nextProject && (
                <div
                  className={styles.nextProjectCard}
                  onClick={() => navigateProject(1)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigateProject(1);
                    }
                  }}
                >
                  <div className={styles.nextProjectThumb}>
                    <Image
                      src={nextProject.image}
                      alt={nextProject.title}
                      fill
                      sizes="100px"
                      className={styles.nextProjectThumbImg}
                    />
                  </div>
                  <div className={styles.nextProjectInfo}>
                    <span className={styles.nextProjectTitle}>{nextProject.title}</span>
                    <span className={styles.nextProjectSub}>{nextProject.category}</span>
                    <span className={styles.nextProjectBadge}>PRÓXIMO PROJETO</span>
                  </div>
                  <div className={styles.nextProjectAction}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9 15L15 9M15 9H10M15 9V14" />
                    </svg>
                  </div>
                </div>
              )}
            </aside>
          </div>

          {/* Thin yellow fixed marquee at the bottom of the screen */}
          <div ref={marqueeRef} className={styles.modalBottomMarquee} aria-hidden="true">
            <div className={styles.modalMarqueeTrack}>
              <div className={styles.modalMarqueeContent}>
                <span>{activeProject.title}</span>
                <span className={styles.marqueeDot}>✦</span>
                <span>{activeProject.category}</span>
                <span className={styles.marqueeDot}>✦</span>
                <span>{activeProject.location}</span>
                <span className={styles.marqueeDot}>✦</span>
                <span>ANO {activeProject.year}</span>
                <span className={styles.marqueeDot}>✦</span>
                <span>ÁREA {activeProject.area}</span>
                <span className={styles.marqueeDot}>✦</span>
                <span>ARCHITECTURE & URBAN DESIGN</span>
                <span className={styles.marqueeDot}>✦</span>
                <span>PROJETO EXECUTIVO</span>
                <span className={styles.marqueeDot}>✦</span>
              </div>
              <div className={styles.modalMarqueeContent}>
                <span>{activeProject.title}</span>
                <span className={styles.marqueeDot}>✦</span>
                <span>{activeProject.category}</span>
                <span className={styles.marqueeDot}>✦</span>
                <span>{activeProject.location}</span>
                <span className={styles.marqueeDot}>✦</span>
                <span>ANO {activeProject.year}</span>
                <span className={styles.marqueeDot}>✦</span>
                <span>ÁREA {activeProject.area}</span>
                <span className={styles.marqueeDot}>✦</span>
                <span>ARCHITECTURE & URBAN DESIGN</span>
                <span className={styles.marqueeDot}>✦</span>
                <span>PROJETO EXECUTIVO</span>
                <span className={styles.marqueeDot}>✦</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}