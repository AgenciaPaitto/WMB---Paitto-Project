import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, TrendingUp, Palmtree, CheckCircle2, ChevronRight, Menu, X, ArrowRight, Home, Shield, Mail } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Diamond from './components/Diamond';
import { refineMessageWithAI } from './services/geminiService';
import { SectionId } from './types';

// Asset Constants (Placeholders)
const IMAGES = {
  heroBg: "https://picsum.photos/1920/1080?grayscale&blur=2",
  wesley: "https://picsum.photos/600/800?grayscale",
  house1: "https://picsum.photos/800/600?image=1029", // Building/Construction vibe
  house2: "https://picsum.photos/800/600?image=1048", // Nature/Modern vibe
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', whatsapp: '', email: '', message: '' });
  const [isRefining, setIsRefining] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleRefineMessage = async () => {
    if (!contactForm.message) return;
    setIsRefining(true);
    const refined = await refineMessageWithAI(contactForm.message);
    setContactForm(prev => ({ ...prev, message: refined }));
    setIsRefining(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Nav Items
  const navItems = [
    { label: 'Coleção', id: SectionId.SHOWCASE },
    { label: 'O Visionário', id: SectionId.BIO },
    { label: 'Localização', id: SectionId.AMENITIES },
    { label: 'Contato', id: SectionId.CTA },
  ];

  if (loading) {
    return (
      <AnimatePresence>
        <LoadingScreen onComplete={() => setLoading(false)} />
      </AnimatePresence>
    );
  }

  return (
    <div className="font-sans text-gray-300 bg-background selection:bg-gold-500 selection:text-black">
      <CustomCursor />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            <div className="font-serif text-xl tracking-widest text-gold-400 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                WM BUSTAMANTE
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex gap-8">
                {navItems.map(item => (
                    <button 
                        key={item.id} 
                        onClick={() => scrollToSection(item.id)}
                        className="text-xs uppercase tracking-widest hover:text-gold-400 transition-colors"
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden text-gold-400" onClick={toggleMobileMenu}>
                {mobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 z-30 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
            >
                {navItems.map(item => (
                    <button 
                        key={item.id} 
                        onClick={() => scrollToSection(item.id)}
                        className="font-serif text-2xl text-gold-100"
                    >
                        {item.label}
                    </button>
                ))}
            </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        
        {/* HERO SECTION */}
        <section id={SectionId.HERO} className="relative h-screen w-full overflow-hidden flex items-center">
            {/* Background simulated video */}
            <div className="absolute inset-0 z-0">
                <img src={IMAGES.heroBg} alt="Background" className="w-full h-full object-cover opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/80" />
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight text-white mb-6">
                        A Precisão da <span className="text-gold-gradient">Joalheria</span>.<br/>
                        A Solidez do <span className="text-gold-gradient">Imobiliário</span>.
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-light mb-8 max-w-lg">
                        Invista nos EUA com o olhar artístico de Wesley Bustamante.
                    </p>
                    <button 
                        onClick={() => scrollToSection(SectionId.SHOWCASE)}
                        className="group relative px-8 py-4 border border-gold-500/30 text-gold-400 uppercase tracking-[0.2em] text-xs hover:bg-gold-500/10 transition-all duration-500"
                    >
                        Explore a Coleção
                        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold-500" />
                        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold-500" />
                    </button>
                </motion.div>

                {/* 3D Diamond Element */}
                <div className="hidden md:flex justify-center items-center h-full">
                    <Diamond />
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-gold-400 to-transparent" />
            </motion.div>
        </section>

        {/* BIO SECTION */}
        <section id={SectionId.BIO} className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <motion.div 
                        className="w-full md:w-1/2 relative group"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative aspect-[3/4] overflow-hidden border border-white/10">
                            <img src={IMAGES.wesley} alt="Wesley Bustamante" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                            <div className="absolute inset-0 border border-gold-500/20 m-4" />
                        </div>
                    </motion.div>

                    <motion.div 
                        className="w-full md:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="font-serif text-4xl text-white mb-8">O Visionário</h2>
                        <div className="w-12 h-[1px] bg-gold-500 mb-8" />
                        <p className="text-gray-400 leading-relaxed mb-8 text-lg font-light">
                            Wesley Bustamante não apenas constrói; ele assina. Com uma carreira dedicada a criar joias exclusivas para presidentes e celebridades, Wesley aplica a mesma obsessão milimétrica na seleção e construção de imóveis de alto padrão nos EUA.
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-12 text-lg font-light">
                            Do micro detalhe de um diamante ao macro projeto de uma residência, a busca pela perfeição é inegociável.
                        </p>
                        
                        <div className="font-script text-4xl text-gold-400">
                            Wesley Bustamante - CEO
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* SHOWCASE SECTION */}
        <section id={SectionId.SHOWCASE} className="py-32 bg-card relative">
            <div className="container mx-auto px-6 mb-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="font-serif text-3xl md:text-5xl mb-4">A Coleção Privada</h2>
                    <p className="text-gold-400 uppercase tracking-widest text-sm">Spring Lake, Florida. Unidades Limitadas.</p>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 overflow-x-auto pb-12 hide-scrollbar">
                <div className="flex gap-8 md:gap-12 md:justify-center min-w-[max-content] md:min-w-0">
                    
                    {/* Card 1 */}
                    <div className="group relative w-[350px] md:w-[450px] bg-background border border-white/5 hover:border-gold-500/30 transition-all duration-500">
                        <div className="aspect-[4/3] overflow-hidden relative">
                            <img src={IMAGES.house1} alt="Modelo Edna" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                            
                            {/* Blueprint Overlay Effect */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/blueprint-grid.png')] opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                        </div>
                        <div className="p-8">
                            <h3 className="font-serif text-2xl text-white mb-2">Modelo Edna</h3>
                            <p className="text-gold-400 text-xs tracking-widest uppercase mb-6">A Clássica Moderna</p>
                            
                            <div className="space-y-3 mb-8 border-t border-white/10 pt-6">
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Configuração</span>
                                    <span className="text-white">3 Beds | 3 Baths</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Área Total</span>
                                    <span className="text-white">230m²</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Investimento</span>
                                    <span className="text-gold-400 font-serif text-lg">$288,000</span>
                                </div>
                            </div>
                            
                            <ul className="text-xs text-gray-500 space-y-2 uppercase tracking-wide">
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold-500 rounded-full" /> Maior Metragem</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold-500 rounded-full" /> Espaço Imponente</li>
                            </ul>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="group relative w-[350px] md:w-[450px] bg-background border border-white/5 hover:border-gold-500/30 transition-all duration-500">
                        <div className="aspect-[4/3] overflow-hidden relative">
                            <img src={IMAGES.house2} alt="Modelo Loris" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                             {/* Blueprint Overlay Effect */}
                             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/blueprint-grid.png')] opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                        </div>
                        <div className="p-8">
                            <h3 className="font-serif text-2xl text-white mb-2">Modelo Loris</h3>
                            <p className="text-gold-400 text-xs tracking-widest uppercase mb-6">Sofisticação Aberta</p>
                            
                            <div className="space-y-3 mb-8 border-t border-white/10 pt-6">
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Configuração</span>
                                    <span className="text-white">3 Beds | 3 Baths</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Área Total</span>
                                    <span className="text-white">273m²</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Investimento</span>
                                    <span className="text-gold-400 font-serif text-lg">$200,008</span>
                                </div>
                            </div>

                            <ul className="text-xs text-gray-500 space-y-2 uppercase tracking-wide">
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold-500 rounded-full" /> Acabamento Sofisticado</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold-500 rounded-full" /> Eficiência Inteligente</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* AMENITIES SECTION */}
        <section id={SectionId.AMENITIES} className="py-32 bg-background border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <h2 className="font-serif text-3xl mb-4">O Cenário: <br/> Sebring & <br/> Spring Lake</h2>
                        <p className="text-gray-500 text-sm">Um refúgio estratégico.</p>
                    </div>

                    {[
                        { icon: MapPin, title: "Localização", desc: "84 milhas de Orlando. O refúgio perfeito longe do caos." },
                        { icon: TrendingUp, title: "Valorização", desc: "Crescimento populacional de 3.8%. Região em plena ascensão." },
                        { icon: Palmtree, title: "Lazer", desc: "Golfe particular, Quadras de Pickleball, Tênis e Pesca." }
                    ].map((feature, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="bg-card p-8 border border-white/5 hover:border-gold-500/20 transition-all group"
                        >
                            <feature.icon className="w-8 h-8 text-gold-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="font-serif text-lg text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* TRUST INDICATORS */}
        <section id={SectionId.TRUST} className="py-24 bg-card">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="font-serif text-center text-2xl text-white mb-12">Segurança & Transparência</h2>
                <div className="grid gap-6">
                    {[
                        "Acesso 24h às câmeras da obra (Transparência Total)",
                        "Garantia de 1º ano de aluguel pago pela Construtora",
                        "Abertura de conta PJ nos EUA com depósito de apenas U$100",
                        "Estruturação de LLC para eficiência fiscal e sucessória"
                    ].map((item, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-4 p-4 border-b border-white/5"
                        >
                            <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
                            <span className="text-gray-300 font-light">{item}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA SECTION */}
        <section id={SectionId.CTA} className="py-32 bg-background relative overflow-hidden">
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold-900/10 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 max-w-2xl relative z-10">
                <motion.div
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     viewport={{ once: true }}
                     className="text-center mb-16"
                >
                    <h2 className="font-serif text-4xl text-white mb-4">Uma oportunidade rara não espera.</h2>
                    <p className="text-gray-400 font-light">Agende uma consultoria privada com a equipe Bustamante.</p>
                </motion.div>

                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-6">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Nome Completo"
                                value={contactForm.name}
                                onChange={e => setContactForm({...contactForm, name: e.target.value})}
                                className="w-full bg-transparent border-b border-gray-700 py-4 text-white focus:outline-none focus:border-gold-400 transition-colors placeholder:text-gray-600 font-light"
                            />
                        </div>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="WhatsApp"
                                value={contactForm.whatsapp}
                                onChange={e => setContactForm({...contactForm, whatsapp: e.target.value})}
                                className="w-full bg-transparent border-b border-gray-700 py-4 text-white focus:outline-none focus:border-gold-400 transition-colors placeholder:text-gray-600 font-light"
                            />
                        </div>
                         <div className="relative">
                            <input 
                                type="email" 
                                placeholder="Email Corporativo"
                                value={contactForm.email}
                                onChange={e => setContactForm({...contactForm, email: e.target.value})}
                                className="w-full bg-transparent border-b border-gray-700 py-4 text-white focus:outline-none focus:border-gold-400 transition-colors placeholder:text-gray-600 font-light"
                            />
                        </div>
                        <div className="relative">
                            <textarea 
                                placeholder="Mensagem (Opcional)"
                                rows={2}
                                value={contactForm.message}
                                onChange={e => setContactForm({...contactForm, message: e.target.value})}
                                className="w-full bg-transparent border-b border-gray-700 py-4 text-white focus:outline-none focus:border-gold-400 transition-colors placeholder:text-gray-600 font-light resize-none"
                            />
                            {contactForm.message && (
                                <button 
                                    onClick={handleRefineMessage}
                                    className="absolute right-0 bottom-4 text-xs text-gold-400 hover:text-gold-100 flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
                                    type="button"
                                >
                                    {isRefining ? "Refining..." : "AI Assist: Refine Message"}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="pt-8 text-center">
                        <button className="w-full md:w-auto bg-gold-500 text-black px-12 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-white transition-colors duration-300">
                            Solicitar Consultoria
                        </button>
                        <p className="mt-6 text-gold-600 text-xs tracking-widest uppercase">
                            Apenas 3 unidades disponíveis nesta fase
                        </p>
                    </div>
                </form>
            </div>
        </section>

        {/* FOOTER */}
        <footer id={SectionId.FOOTER} className="bg-black py-16 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h4 className="font-serif text-lg text-gold-400 tracking-widest mb-2">WM BUSTAMANTE</h4>
                        <p className="text-gray-600 text-xs uppercase">Handcrafted for High-End Living.</p>
                    </div>
                    
                    <div className="flex flex-col items-center md:items-end gap-2 text-gray-400 text-sm font-light">
                        <a href="#" className="hover:text-gold-400 transition-colors">+1 (954) 995-8274</a>
                        <a href="#" className="hover:text-gold-400 transition-colors">+55 11 99292-7262</a>
                        <a href="#" className="hover:text-gold-400 transition-colors">@wmbustamanteinvestments</a>
                    </div>
                </div>
                <div className="mt-12 text-center text-gray-700 text-xs">
                    © 2024 WM Bustamante Investments. All Rights Reserved.
                </div>
            </div>
        </footer>

      </main>
    </div>
  );
};

export default App;