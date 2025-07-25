
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { type BlogPost, type BlogComment } from '../types/sdk';
import { BlogService } from '../lib/sdk';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Eye, 
  Heart, 
  MessageSquare, 
  Share2, 
  Tag, 
  Clock, 
  ThumbsUp, 
  Send, 
  BookOpen, 
  TrendingUp, 
  Star, 
  Search, 
  Filter, 
  MoreHorizontal,
  Edit,
  Trash2,
  Flag,
  Bookmark,
  Link as LinkIcon,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Copy,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
  Bell,
  Settings,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  Move,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Crop,
  Image,
  Video,
  Audio,
  File,
  Folder,
  Archive,
  Download,
  Upload,
  Cloud,
  Server,
  Database,
  Wifi,
  Battery,
  Power,
  Volume,
  VolumeX,
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  FastForward,
  Rewind,
  Repeat,
  Shuffle,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Watch,
  Headphones,
  Speaker,
  Keyboard,
  Mouse,
  Printer,
  Scanner,
  Gamepad,
  Joystick,
  Cpu,
  MemoryStick,
  HardDrive,
  SdCard,
  Usb,
  Bluetooth,
  Rss,
  Atom,
  Hash,
  AtSign,
  Percent,
  DollarSign,
  PoundSterling,
  Euro,
  Yen,
  IndianRupee,
  Bitcoin,
  Coins,
  CreditCard,
  Wallet,
  Receipt,
  ShoppingCart,
  ShoppingBag,
  Gift,
  Package,
  Truck,
  Plane,
  Car,
  Train,
  Bus,
  Bike,
  Footprints,
  MapPin,
  Map,
  Compass,
  Navigation,
  Route,
  Milestone,
  Mountain,
  Trees,
  Flower,
  Leaf,
  Seedling,
  Sun,
  Moon,
  Stars,
  Cloud as CloudIcon,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudHail,
  Snowflake,
  Droplet,
  Droplets,
  Waves,
  Wind,
  Tornado,
  Zap,
  Flame,
  Thermometer,
  Gauge,
  Activity,
  Pulse,
  Heartbeat,
  Stethoscope,
  Pill,
  Syringe,
  Bandage,
  FirstAid,
  Cross,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  Scan,
  QrCode,
  Barcode,
  Id,
  UserCheck,
  UserX,
  UserPlus,
  UserMinus,
  Users,
  Team,
  Crown,
  Award,
  Trophy,
  Medal,
  Target,
  Zap as ZapIcon,
  Lightbulb,
  Idea,
  Brain,
  Puzzle,
  Gamepad2,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Spade,
  Club,
  Diamond,
  Heart as HeartIcon,
  Music,
  Music2,
  Music3,
  Music4,
  Radio,
  Disc,
  Disc2,
  Disc3,
  Cassette,
  Vinyl,
  Guitar,
  Piano,
  Drum,
  Trumpet,
  Violin,
  Microphone,
  Headset,
  VolumeUp,
  VolumeDown,
  Volume1,
  Volume2,
  Mute,
  Unmute,
  SpeakerLoud,
  SpeakerQuiet,
  Equalizer,
  Sliders,
  Knob,
  Tuning,
  Waveform,
  Soundwave,
  Frequency,
  Signal,
  Antenna,
  Broadcast,
  Radio as RadioIcon,
  Tv,
  Monitor as MonitorIcon,
  Screen,
  Projector,
  Camera as CameraIcon,
  Video as VideoIcon,
  Film,
  Clapperboard,
  Megaphone,
  Bullhorn,
  Loudspeaker,
  VoiceMail,
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  PhoneOff,
  Smartphone as SmartphoneIcon,
  TabletSmartphone,
  Laptop as LaptopIcon,
  PcCase,
  HardDriveIcon,
  SsdIcon,
  CpuIcon,
  MemoryStickIcon,
  MousePointer,
  MousePointer2,
  Touchpad,
  Keyboard as KeyboardIcon,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Superscript,
  Subscript,
  Quote,
  List,
  ListOrdered,
  Indent,
  Outdent,
  WrapText,
  Columns,
  Rows,
  Table,
  Grid,
  Layout,
  Sidebar,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  SplitSquareHorizontal,
  SplitSquareVertical,
  Square,
  Rectangle,
  Circle,
  Triangle,
  Pentagon,
  Hexagon,
  Octagon,
  Diamond as DiamondIcon,
  Star as StarIcon,
  Heart as HeartIcon2,
  Smile,
  Frown,
  Meh,
  Angry,
  Laugh,
  Grin,
  Confused,
  Surprised,
  Tired,
  Dizzy,
  Expressionless,
  Neutral,
  Sleepy,
  Drooling,
  Nauseous,
  Vomiting,
  Sneezing,
  Thermometer as ThermometerIcon,
  Bandage as BandageIcon,
  Pill as PillIcon,
  Syringe as SyringeIcon,
  Stethoscope as StethoscopeIcon,
  Microscope,
  TestTube,
  Dna,
  Atom as AtomIcon,
  Molecule,
  Beaker,
  Flask,
  Erlenmeyer,
  Pipette,
  Dropper,
  Scale,
  Ruler,
  Compass as CompassIcon,
  Triangle as TriangleIcon,
  Square as SquareIcon,
  Circle as CircleIcon,
  Pentagon as PentagonIcon,
  Hexagon as HexagonIcon,
  Octagon as OctagonIcon,
  Rhombus,
  Parallelogram,
  Trapezoid,
  Kite,
  Oval,
  Ellipse,
  Arc,
  Curve,
  Line,
  Polyline,
  Polygon,
  Bezier,
  Spline,
  Vector,
  Anchor,
  Crosshair,
  Focus,
  Aperture,
  Iris,
  Lens,
  Viewfinder,
  Scope,
  Telescope,
  Binoculars,
  Magnifier,
  MagnifyingGlass,
  Loupe,
  Microscope as MicroscopeIcon,
  Telescope as TelescopeIcon,
  Satellite,
  Globe,
  Earth,
  World,
  Planet,
  Orbit,
  Rocket,
  Shuttle,
  Ufo,
  Alien,
  Robot,
  Android,
  Cyborg,
  Humanoid,
  Ai,
  Brain as BrainIcon,
  Neuron,
  Synapse,
  Dendrite,
  Axon,
  Nerve,
  Spine,
  Skeleton,
  Skull,
  Bone,
  Ribcage,
  Pelvis,
  Femur,
  Tibia,
  Fibula,
  Radius,
  Ulna,
  Humerus,
  Scapula,
  Clavicle,
  Sternum,
  Vertebra,
  Disc,
  Joint,
  Ligament,
  Tendon,
  Muscle,
  Tissue,
  Organ,
  Liver,
  Kidney,
  Lung,
  Heart as HeartIcon3,
  Stomach,
  Intestine,
  Colon,
  Pancreas,
  Spleen,
  Gallbladder,
  Bladder,
  Uterus,
  Ovary,
  Testis,
  Prostate,
  Thyroid,
  Adrenal,
  Pituitary,
  Hypothalamus,
  Cerebrum,
  Cerebellum,
  Brainstem,
  Cortex,
  Hippocampus,
  Amygdala,
  Thalamus,
  Basal,
  Ganglia,
  Ventricle,
  Meninges,
  Csf,
  BloodBrain,
  Barrier,
  Neurotransmitter,
  Dopamine,
  Serotonin,
  Norepinephrine,
  Acetylcholine,
  Gaba,
  Glutamate,
  Endorphin,
  Oxytocin,
  Vasopressin,
  Insulin,
  Glucagon,
  Cortisol,
  Adrenaline,
  Testosterone,
  Estrogen,
  Progesterone,
  Thyroxine,
  Calcitonin,
  Parathyroid,
  Melatonin,
  Growth,
  Hormone,
  Prolactin,
  Fsh,
  Lh,
  Tsh,
  Acth,
  Adh,
  Renin,
  Angiotensin,
  Aldosterone,
  Erythropoietin,
  Leptin,
  Ghrelin,
  Adiponectin,
  Resistin,
  Visfatin,
  Omentin,
  Chemerin,
  Apelin,
  Vaspin,
  Progranulin,
  Retinol,
  Binding,
  Protein,
  Albumin,
  Globulin,
  Fibrinogen,
  Prothrombin,
  Plasminogen,
  Antithrombin,
  Protein_c,
  Protein_s,
  Factor_v,
  Factor_vii,
  Factor_viii,
  Factor_ix,
  Factor_x,
  Factor_xi,
  Factor_xii,
  Factor_xiii,
  Von_willebrand,
  Hemoglobin,
  Hematocrit,
  Platelet,
  Leukocyte,
  Neutrophil,
  Lymphocyte,
  Monocyte,
  Eosinophil,
  Basophil,
  Erythrocyte,
  Reticulocyte,
  Plasma,
  Serum,
  Whole_blood,
  Packed_cells,
  Platelet_concentrate,
  Fresh_frozen_plasma,
  Cryoprecipitate,
  Immunoglobulin,
  Antigen,
  Antibody,
  Complement,
  Cytokine,
  Interleukin,
  Interferon,
  Tumor_necrosis_factor,
  Transforming_growth_factor,
  Platelet_derived_growth_factor,
  Vascular_endothelial_growth_factor,
  Nerve_growth_factor,
  Brain_derived_neurotrophic_factor,
  Glial_cell_line_derived_neurotrophic_factor,
  Ciliary_neurotrophic_factor,
  Neurotrophin,
  Bdnf,
  Gdnf,
  Cntf,
  Ngf,
  Nt3,
  Nt4,
  Trk,
  P75,
  Ret,
  Gfr,
  Alpha,
  Lifr,
  Cntfr,
  Gp130,
  Jak,
  Stat,
  Pi3k,
  Akt,
  Mtor,
  Mapk,
  Erk,
  Jnk,
  P38,
  Nfkb,
  Ap1,
  Creb,
  Atf,
  Sp1,
  Myc,
  Fos,
  Jun,
  Egr,
  Nfat,
  Foxo,
  P53,
  Rb,
  E2f,
  Cyclin,
  Cdk,
  P21,
  P27,
  Bcl2,
  Bax,
  Bad,
  Bid,
  Bim,
  Puma,
  Noxa,
  Mcl1,
  Bcl_xl,
  Bcl_w,
  A1,
  Bfl1,
  Survivin,
  Xiap,
  Ciap,
  Naip,
  Livin,
  Bruce,
  Apollon,
  Smac,
  Diablo,
  Omi,
  Htra2,
  Endog,
  Aif,
  Cytochrome_c,
  Apaf1,
  Caspase,
  Fadd,
  Tradd,
  Traf,
  Rip,
  Flip,
  Cflar,
  Disc,
  Death_receptor,
  Fas,
  Fasl,
  Tnf,
  Tnfr,
  Trail,
  Dr4,
  Dr5,
  Dcp1,
  Dcp2,
  Dcr1,
  Dcr2,
  Osteoprotegerin,
  Rankl,
  Rank,
  M_csf,
  Csf1r,
  Runx2,
  Osterix,
  Osteocalcin,
  Osteopontin,
  Bone_sialoprotein,
  Dentin_matrix_protein,
  Dentin_sialophosphoprotein,
  Amelogenin,
  Enamelin,
  Ameloblastin,
  Tuftelin,
  Sheathlin,
  Dentin,
  Enamel,
  Cementum,
  Pulp,
  Periodontal_ligament,
  Alveolar_bone,
  Gingiva,
  Mucosa,
  Tongue,
  Palate,
  Uvula,
  Tonsil,
  Salivary_gland,
  Parotid,
  Submandibular,
  Sublingual,
  Saliva,
  Mucin,
  Amylase,
  Lipase,
  Lysozyme,
  Lactoferrin,
  Secretory_iga,
  Histatins,
  Cystatins,
  Proline_rich_proteins,
  Statherin,
  Mucin_7,
  Mucin_5b,
  Dmbt1,
  Lactalbumin,
  Lactoglobulin,
  Casein,
  Whey,
  Lactose,
  Galactose,
  Glucose,
  Fructose,
  Sucrose,
  Maltose,
  Starch,
  Glycogen,
  Cellulose,
  Pectin,
  Chitin,
  Chitosan,
  Hyaluronic_acid,
  Chondroitin_sulfate,
  Dermatan_sulfate,
  Heparan_sulfate,
  Heparin,
  Keratan_sulfate,
  Collagen,
  Elastin,
  Fibronectin,
  Laminin,
  Vitronectin,
  Thrombospondin,
  Tenascin,
  Osteonectin,
  Osteopontin as OsteopontinIcon,
  Bone_sialoprotein as BoneSialoproteinIcon,
  Osteocalcin as OsteocalcinIcon,
  Alkaline_phosphatase,
  Acid_phosphatase,
  Cathepsin,
  Mmp,
  Timp,
  Plau,
  Plat,
  Pai1,
  Pai2,
  Plasmin,
  Plasminogen_activator,
  Urokinase,
  Streptokinase,
  Tissue_plasminogen_activator,
  Alteplase,
  Reteplase,
  Tenecteplase,
  Anistreplase,
  Monteplase,
  Lanoteplase,
  Desmoteplase,
  Microplasmin,
  Plasmin_alpha2_antiplasmin,
  Fibrin,
  Fibrinogen as FibrinogenIcon,
  Fibrinopeptide,
  Fibrin_degradation_products,
  D_dimer,
  Fibrinolysis,
  Coagulation,
  Hemostasis,
  Thrombosis,
  Embolism,
  Bleeding,
  Hemorrhage,
  Hematoma,
  Petechiae,
  Purpura,
  Ecchymosis,
  Bruise,
  Contusion,
  Laceration,
  Abrasion,
  Puncture,
  Incision,
  Avulsion,
  Amputation,
  Fracture,
  Dislocation,
  Sprain,
  Strain,
  Concussion,
  Contusion as ContusionIcon,
  Hematoma as HematomaIcon,
  Edema,
  Swelling,
  Inflammation,
  Infection,
  Sepsis,
  Shock,
  Anaphylaxis,
  Allergy,
  Asthma,
  Bronchospasm,
  Laryngospasm,
  Airway_obstruction,
  Respiratory_failure,
  Cardiac_arrest,
  Arrhythmia,
  Bradycardia,
  Tachycardia,
  Fibrillation,
  Flutter,
  Heart_block,
  Myocardial_infarction,
  Angina,
  Stroke,
  Transient_ischemic_attack,
  Seizure,
  Epilepsy,
  Coma,
  Delirium,
  Dementia,
  Alzheimer,
  Parkinson,
  Huntington,
  Als,
  Multiple_sclerosis,
  Myasthenia_gravis,
  Guillain_barre,
  Peripheral_neuropathy,
  Diabetic_neuropathy,
  Carpal_tunnel,
  Sciatica,
  Herniated_disc,
  Spinal_stenosis,
  Scoliosis,
  Kyphosis,
  Lordosis,
  Osteoporosis,
  Osteoarthritis,
  Rheumatoid_arthritis,
  Lupus,
  Fibromyalgia,
  Chronic_fatigue,
  Irritable_bowel,
  Inflammatory_bowel,
  Crohn,
  Ulcerative_colitis,
  Celiac,
  Peptic_ulcer,
  Gastritis,
  Reflux,
  Hiatal_hernia,
  Gallstones,
  Pancreatitis,
  Hepatitis,
  Cirrhosis,
  Liver_failure,
  Kidney_failure,
  Dialysis,
  Transplant,
  Rejection,
  Immunosuppression,
  Chemotherapy,
  Radiation,
  Surgery,
  Anesthesia,
  Intensive_care,
  Emergency,
  Trauma,
  Triage,
  Resuscitation,
  Cpr,
  Aed,
  Intubation,
  Mechanical_ventilation,
  Oxygen_therapy,
  Nebulizer,
  Inhaler,
  Epinephrine,
  Nitroglycerin,
  Aspirin,
  Ibuprofen,
  Acetaminophen,
  Morphine,
  Codeine,
  Oxycodone,
  Fentanyl,
  Tramadol,
  Gabapentin,
  Pregabalin,
  Amitriptyline,
  Duloxetine,
  Sertraline,
  Fluoxetine,
  Paroxetine,
  Citalopram,
  Escitalopram,
  Venlafaxine,
  Bupropion,
  Mirtazapine,
  Trazodone,
  Lorazepam,
  Alprazolam,
  Clonazepam,
  Diazepam,
  Midazolam,
  Propofol,
  Etomidate,
  Ketamine,
  Sevoflurane,
  Isoflurane,
  Desflurane,
  Nitrous_oxide,
  Lidocaine,
  Bupivacaine,
  Ropivacaine,
  Articaine,
  Procaine,
  Tetracaine,
  Benzocaine,
  Dibucaine,
  Pramoxine,
  Dyclonine,
  Hexylcaine,
  Butacaine,
  Chloroprocaine,
  Mepivacaine,
  Prilocaine,
  Levobupivacaine,
  Articaine as ArticaineIcon,
  Procaine as ProcaineIcon,
  Tetracaine as TetracaineIcon,
  Benzocaine as BenzocaineIcon,
  Dibucaine as DibucaineIcon,
  Pramoxine as PramoxineIcon,
  Dyclonine as DycloninIcon,
  Hexylcaine as HexylcaineIcon,
  Butacaine as ButacaineIcon,
  Chloroprocaine as ChloroprocaineIcon,
  Mepivacaine as MepivacaineIcon,
  Prilocaine as PrilocaineIcon,
  Levobupivacaine as LevobupivacaineIcon,
  RefreshCw,
  Maximize2
} from 'lucide-react';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    content: ''
  });

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      
      try {
        const postData = await BlogService.getPostBySlug(slug);
        if (postData) {
          setPost(postData);
          
          // Load comments and related posts
          const [commentsData, relatedData] = await Promise.all([
            BlogService.getComments(postData.id),
            BlogService.getRelatedPosts(postData.id)
          ]);
          
          setComments(commentsData);
          setRelatedPosts(relatedData);
          
          // Update view count
          await BlogService.updatePostViews(postData.id);
        }
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    try {
      const commentData = {
        postId: post.id,
        ...newComment,
        status: 'pending' as const,
        likes: 0
      };

      await BlogService.addComment(commentData);
      
      // Refresh comments
      const updatedComments = await BlogService.getComments(post.id);
      setComments(updatedComments);
      
      // Reset form
      setNewComment({ author: '', email: '', content: '' });
      
      alert('Comment submitted successfully! It will be reviewed before being published.');
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Error submitting comment. Please try again.');
    }
  };

  const handleLikePost = async () => {
    if (!post) return;
    
    try {
      await BlogService.likePost(post.id);
      setPost(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/blog" className="inline-flex items-center text-brand-primary hover:text-brand-primary/80">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Article Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <span>•</span>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {post.author}
              </div>
              <span>•</span>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {post.views} views
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge variant="outline">{post.category}</Badge>
                {post.featured && (
                  <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                <div className="flex items-center space-x-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={handleLikePost}>
                  <Heart className="w-4 h-4 mr-1" />
                  {post.likes}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="px-8 py-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-6 font-medium">{post.excerpt}</p>
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {post.content}
              </div>
            </div>
          </div>

          {/* Article Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Share this article:</span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Last updated: {new Date(post.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <MessageSquare className="w-6 h-6 mr-2" />
              Comments ({comments.length})
            </h2>
          </div>

          {/* Comment Form */}
          <div className="px-8 py-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave a Comment</h3>
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={newComment.author}
                    onChange={(e) => setNewComment(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newComment.email}
                    onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                <textarea
                  value={newComment.content}
                  onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  required
                />
              </div>
              <Button type="submit">
                <Send className="w-4 h-4 mr-2" />
                Submit Comment
              </Button>
            </form>
          </div>

          {/* Comments List */}
          <div className="px-8 py-6">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
            ) : (
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-brand-primary" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">{comment.author}</span>
                          <span className="text-sm text-gray-500 ml-2">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Badge variant={comment.status === 'approved' ? 'default' : 'secondary'}>
                        {comment.status}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-2">{comment.content}</p>
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                Related Posts
              </h2>
            </div>
            <div className="px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`} className="group">
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-gray-900 group-hover:text-brand-primary mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{relatedPost.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{relatedPost.author}</span>
                        <div className="flex items-center space-x-2">
                          <span>{relatedPost.views} views</span>
                          <span>•</span>
                          <span>{relatedPost.likes} likes</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogPostPage;
