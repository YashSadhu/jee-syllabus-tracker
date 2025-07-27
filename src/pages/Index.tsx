import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CheckCircle2, Circle, Search, Copy, BookOpen, GraduationCap, Calculator, Atom, ChevronDown, ChevronRight, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const syllabusData = {
  "Chemistry": {
    "General Topics": [
      "Concept of atoms and molecules",
      "Dalton's atomic theory", 
      "Mole concept",
      "Chemical formulae",
      "Balanced chemical equations",
      "Calculations involving common oxidation-reduction reactions",
      "Calculations involving neutralisation reactions",
      "Calculations involving displacement reactions",
      "Concentration in terms of mole fraction",
      "Concentration in terms of molarity",
      "Concentration in terms of molality", 
      "Concentration in terms of normality"
    ],
    "States of Matter: Gases and Liquids": [
      "Gas laws and ideal gas equation",
      "Absolute scale of temperature",
      "Deviation from ideality",
      "van der Waals equation",
      "Kinetic theory of gases",
      "Average velocity and relation with temperature",
      "Root mean square velocity and relation with temperature",
      "Most probable velocity and relation with temperature",
      "Law of partial pressures",
      "Diffusion of gases",
      "Intermolecular interactions: types",
      "Distance dependence of intermolecular interactions",
      "Effect of intermolecular interactions on properties",
      "Liquids: vapour pressure",
      "Surface tension",
      "Viscosity"
    ],
    "Atomic Structure": [
      "Bohr model",
      "Spectrum of hydrogen atom",
      "Wave-particle duality",
      "de Broglie hypothesis",
      "Uncertainty principle",
      "Qualitative quantum mechanical picture of hydrogen atom",
      "Energies in hydrogen atom",
      "Quantum numbers",
      "Wave function and probability density (plots only)",
      "Shapes of s orbital",
      "Shapes of p orbitals",
      "Shapes of d orbitals",
      "Aufbau principle",
      "Pauli's exclusion principle",
      "Hund's rule"
    ],
    "Chemical Bonding and Molecular Structure": [
      "Orbital overlap and covalent bond",
      "Hybridisation involving s, p and d orbitals",
      "Molecular orbital energy diagrams for homonuclear diatomic species",
      "Hydrogen bond",
      "Polarity in molecules, dipole moment",
      "VSEPR model and molecular shapes"
    ],
    "Chemical Thermodynamics": [
      "Intensive and extensive properties",
      "State functions",
      "First law of thermodynamics",
      "Internal energy",
      "Work (pressure-volume only) and heat",
      "Enthalpy",
      "Heat capacity",
      "Standard state",
      "Hess’s law",
      "Enthalpy of reaction, fusion and vapourization, and lattice enthalpy",
      "Second law of thermodynamics",
      "Entropy",
      "Gibbs energy",
      "Criteria of equilibrium and spontaneity"
    ],
    "Chemical and Ionic Equilibrium": [
      "Law of mass action",
      "Significance of ΔG and ΔG⊖ in chemical equilibrium",
      "Equilibrium constant (Kp and Kc) and reaction quotient",
      "Le Chatelier’s principle (effect of concentration, temperature and pressure)",
      "Solubility product and its applications",
      "Common ion effect",
      "pH and buffer solutions",
      "Acids and bases (Brønsted and Lewis concepts)",
      "Hydrolysis of salts"
    ],
    "Electrochemistry": [
      "Electrochemical cells and cell reactions",
      "Standard electrode potentials",
      "Electrochemical work",
      "Nernst equation",
      "Electrochemical series",
      "emf of galvanic cells",
      "Faraday’s laws of electrolysis",
      "Electrolytic conductance",
      "Specific, equivalent and molar conductivity",
      "Kohlrausch’s law",
      "Batteries: Primary and Secondary, fuel cells",
      "Corrosion"
    ],
    "Chemical Kinetics": [
      "Rates of chemical reactions",
      "Order and molecularity of reactions",
      "Rate law, rate constant, half-life",
      "Differential and integrated rate expressions for zero and first order reactions",
      "Temperature dependence of rate constant (Arrhenius equation and activation energy)",
      "Catalysis: Homogeneous and heterogeneous",
      "Activity and selectivity of solid catalysts",
      "Enzyme catalysis and its mechanism"
    ],
    "Solid State": [
      "Classification of solids",
      "Crystalline state",
      "Seven crystal systems (cell parameters a, b, c, α, β, γ)",
      "Close packed structure of solids (cubic and hexagonal)",
      "Packing in fcc, bcc and hcp lattices",
      "Nearest neighbours",
      "Ionic radii and radius ratio",
      "Point defects"
    ],
    "Solutions": [
      "Henry’s law",
      "Raoult’s law",
      "Ideal solutions",
      "Colligative properties: lowering of vapour pressure, elevation of boiling point, depression of freezing point, and osmotic pressure",
      "van’t Hoff factor"
    ],
    "Surface Chemistry": [
      "Elementary concepts of adsorption: Physisorption and Chemisorption",
      "Freundlich adsorption isotherm",
      "Colloids: types, methods of preparation and general properties",
      "Elementary ideas of emulsions, surfactants and micelles (only definitions and examples)"
    ],
    "Classification of Elements and Periodicity in Properties": [
      "Modern periodic law and the present form of periodic table",
      "Electronic configuration of elements",
      "Periodic trends in atomic radius, ionic radius, ionization enthalpy, electron gain enthalpy, valence, oxidation states, electronegativity, and chemical reactivity"
    ],
    "Hydrogen": [
      "Position of hydrogen in periodic table",
      "Occurrence",
      "Isotopes",
      "Preparation, properties and uses of hydrogen",
      "Hydrides – ionic, covalent and interstitial",
      "Physical and chemical properties of water, heavy water",
      "Hydrogen peroxide - preparation, reactions, use and structure",
      "Hydrogen as a fuel"
    ],
    "s-Block Elements": [
      "Alkali and alkaline earth metals - reactivity towards air, water, dihydrogen, halogens, acids",
      "Their reducing nature including solutions in liquid ammonia",
      "Uses of these elements",
      "General characteristics of their oxides, hydroxides, halides, salts of oxoacids",
      "Anomalous behaviour of lithium and beryllium",
      "Preparation, properties, and uses of compounds of sodium (sodium carbonate, sodium chloride, sodium hydroxide, sodium hydrogen carbonate) and calcium (calcium oxide, calcium hydroxide, calcium carbonate, calcium sulphate)"
    ],
    "p-Block Elements": [
      "Oxidation state and trends in chemical reactivity of elements of groups 13-17",
      "Anomalous properties of boron, carbon, nitrogen, oxygen, and fluorine with respect to other elements in their respective groups",
      "Group 13: Reactivity towards acids, alkalis, and halogens; preparation, properties, and uses of borax, orthoboric acid, diborane, boron trifluoride, aluminium chloride, and alums; uses of boron and aluminium",
      "Group 14: Reactivity towards water and halogen; allotropes of carbon and uses of carbon; preparation, properties, and uses of carbon monoxide, carbon dioxide, silicon dioxide, silicones, silicates, zeolites",
      "Group 15: Reactivity towards hydrogen, oxygen, and halogen; allotropes of phosphorous; preparation, properties, and uses of dinitrogen, ammonia, nitric acid, phosphine, phosphorus trichloride, phosphorus pentachloride; oxides of nitrogen and oxoacids of phosphorus",
      "Group 16: Reactivity towards hydrogen, oxygen, and halogen; simple oxides; allotropes of sulfur; preparation/manufacture, properties, and uses of dioxygen, ozone, sulfur dioxide, sulfuric acid; oxoacids of sulfur",
      "Group 17: Reactivity towards hydrogen, oxygen, and metals; preparation/manufacture, properties, and uses of chlorine, hydrogen chloride and interhalogen compounds; oxoacids of halogens, bleaching powder",
      "Group 18: Chemical properties and uses; compounds of xenon with fluorine and oxygen"
    ],
    "d-Block Elements": [
      "Oxidation states and their stability",
      "Standard electrode potentials",
      "Interstitial compounds",
      "Alloys",
      "Catalytic properties",
      "Applications",
      "Preparation, structure, and reactions of oxoanions of chromium and manganese"
    ],
    "f-Block Elements": [
      "Lanthanoid and actinoid contractions",
      "Oxidation states",
      "General characteristics"
    ],
    "Coordination Compounds": [
      "Werner’s theory",
      "Nomenclature, cis-trans and ionization isomerism",
      "Hybridization and geometries (linear, tetrahedral, square planar and octahedral) of mononuclear coordination compounds",
      "Bonding [VBT and CFT (octahedral and tetrahedral fields)]",
      "Magnetic properties (spin-only) and colour of 3d-series coordination compounds",
      "Ligands and spectrochemical series",
      "Stability",
      "Importance and applications",
      "Metal carbonyls"
    ],
    "Isolation of Metals": [
      "Metal ores and their concentration",
      "Extraction of crude metal from concentrated ores: thermodynamic (iron, copper, zinc) and electrochemical (aluminium) principles of metallurgy",
      "Cyanide process (silver and gold)",
      "Refining"
    ],
    "Principles of Qualitative Analysis": [
      "Groups I to V (only Ag+, Hg2+, Cu2+, Pb2+, Fe3+, Cr3+, Al3+, Ca2+, Ba2+, Zn2+, Mn2+ and Mg2+)",
      "Nitrate, halides (excluding fluoride), carbonate and bicarbonate, sulphate and sulphide"
    ],
    "Environmental Chemistry": [
      "Atmospheric pollution",
      "Water pollution",
      "Soil pollution",
      "Industrial waste",
      "Strategies to control environmental pollution",
      "Green chemistry"
    ],
    "Basic Principles of Organic Chemistry": [
      "Hybridisation of carbon",
      "σ and π-bonds",
      "Shapes of simple organic molecules",
      "Aromaticity",
      "Structural and geometrical isomerism",
      "Stereoisomers and stereochemical relationship (enantiomers, diastereomers, meso) of compounds containing only up to two asymmetric centres (R,S and E,Z configurations excluded)",
      "Determination of empirical and molecular formulae of simple compounds by combustion method only",
      "IUPAC nomenclature of organic molecules (hydrocarbons, including simple cyclic hydrocarbons and their mono-functional and bi-functional derivatives only)",
      "Hydrogen bonding effects",
      "Inductive, Resonance and Hyperconjugative effects",
      "Acidity and basicity of organic compounds",
      "Reactive intermediates produced during homolytic and heterolytic bond cleavage",
      "Formation, structure and stability of carbocations, carbanions and free radicals"
    ],
    "Alkanes": [
      "Homologous series",
      "Physical properties (melting points, boiling points and density) and effect of branching on them",
      "Conformations of ethane and butane (Newman projections only)",
      "Preparation from alkyl halides and aliphatic carboxylic acids",
      "Reactions: combustion, halogenation (including allylic and benzylic halogenation) and oxidation"
    ],
    "Alkenes and Alkynes": [
      "Physical properties (boiling points, density and dipole moments)",
      "Preparation by elimination reactions",
      "Acid catalysed hydration (excluding the stereochemistry of addition and elimination)",
      "Metal acetylides",
      "Reactions of alkenes with KMnO4 and ozone",
      "Reduction of alkenes and alkynes",
      "Electrophilic addition reactions of alkenes with X2, HX, HOX, (X=halogen)",
      "Effect of peroxide on addition reactions",
      "Cyclic polymerization reaction of alkynes"
    ],
    "Benzene": [
      "Structure",
      "Electrophilic substitution reactions: halogenation, nitration, sulphonation, Friedel-Crafts alkylation and acylation",
      "Effect of directing groups (monosubstituted benzene) in these reactions"
    ],
    "Phenols": [
      "Physical properties",
      "Preparation",
      "Electrophilic substitution reactions of phenol (halogenation, nitration, sulphonation)",
      "Reimer-Tiemann reaction",
      "Kolbe reaction",
      "Esterification",
      "Etherification",
      "Aspirin synthesis",
      "Oxidation and reduction reactions of phenol"
    ],
    "Alkyl Halides": [
      "Rearrangement reactions of alkyl carbocation",
      "Grignard reactions",
      "Nucleophilic substitution reactions and their stereochemical aspects"
    ],
    "Alcohols": [
      "Physical properties",
      "Reactions: esterification, dehydration (formation of alkenes and ethers)",
      "Reactions with: sodium, phosphorus halides, ZnCl2/concentrated HCl, thionyl chloride",
      "Conversion of alcohols into aldehydes, ketones and carboxylic acids"
    ],
    "Ethers": [
      "Preparation by Williamson’s synthesis",
      "C-O bond cleavage reactions"
    ],
    "Aldehydes and Ketones": [
      "Preparation of: aldehydes and ketones from acid chlorides and nitriles",
      "Aldehydes from esters",
      "Benzaldehyde from toluene and benzene",
      "Reactions: oxidation, reduction, oxime and hydrazone formation",
      "Aldol condensation",
      "Cannizzaro reaction",
      "Haloform reaction",
      "Nucleophilic addition reaction with RMgX, NaHSO3, HCN, alcohol, amine"
    ],
    "Carboxylic Acids": [
      "Physical properties",
      "Preparation: from nitriles, Grignard reagents, hydrolysis of esters and amides",
      "Preparation of benzoic acid from alkylbenzenes",
      "Reactions: reduction, halogenation, formation of esters, acid chlorides and amides"
    ],
    "Amines": [
      "Preparation from nitro compounds, nitriles and amides",
      "Reactions: Hoffmann bromamide degradation, Gabriel phthalimide synthesis",
      "Reaction with nitrous acid",
      "Azo coupling reaction of diazonium salts of aromatic amines",
      "Sandmeyer and related reactions of diazonium salts",
      "Carbylamine reaction",
      "Hinsberg test",
      "Alkylation and acylation reactions"
    ],
    "Haloarenes": [
      "Reactions: Fittig, Wurtz-Fittig",
      "Nucleophilic aromatic substitution in haloarenes and substituted haloarenes (excluding benzyne mechanism and cine substitution)"
    ],
    "Biomolecules": [
      "Carbohydrates: Classification; Mono- and di-saccharides (glucose and sucrose); Oxidation; Reduction; Glycoside formation and hydrolysis of disaccharides (sucrose, maltose, lactose); Anomers",
      "Proteins: Amino acids; Peptide linkage; Structure of peptides (primary and secondary); Types of proteins (fibrous and globular)",
      "Nucleic acids: Chemical composition and structure of DNA and RNA"
    ],
    "Polymers": [
      "Types of polymerization (addition, condensation)",
      "Homo and copolymers",
      "Natural rubber",
      "Cellulose",
      "Nylon",
      "Teflon",
      "Bakelite",
      "PVC",
      "Bio-degradable polymers",
      "Applications of polymers"
    ],
    "Chemistry in Everyday Life": [
      "Drug-target interaction",
      "Therapeutic action, and examples (excluding structures), of antacids, antihistamines, tranquilizers, analgesics, antimicrobials, and antifertility drugs",
      "Artificial sweeteners (names only)",
      "Soaps, detergents, and cleansing action"
    ],
    "Practical Organic Chemistry": [
      "Detection of elements (N, S, halogens)",
      "Detection and identification of the following functional groups: hydroxyl (alcoholic and phenolic), carbonyl (aldehyde and ketone), carboxyl, amino and nitro"
    ]
  },
  "Mathematics": {
    "Sets, Relations and Functions": [
      "Sets and their representations",
      "Different kinds of sets (empty, finite and infinite)",
      "Algebra of sets",
      "Intersection, complement, difference of sets",
      "Symmetric difference of sets and algebraic properties",
      "De-Morgan's laws",
      "Cartesian product of finite sets",
      "Ordered pair, relations",
      "Domain and codomain of relations",
      "Equivalence relation",
      "Functions as mappings",
      "Invertible functions",
      "Even and odd functions", 
      "Into, onto and one-to-one functions",
      "Special functions (polynomial, trigonometric, exponential, logarithmic, power, absolute value, greatest integer)",
      "Sum, difference, product and composition of functions"
    ],
    "Algebra": [
      "Algebra of complex numbers, addition, multiplication, conjugation, polar representation, properties of modulus and principal argument, triangle inequality, cube roots of unity, geometric interpretations",
      "Statement of fundamental theorem of algebra",
      "Quadratic equations with real coefficients, relations between roots and coefficients, formation of quadratic equations with given roots, symmetric functions of roots",
      "Arithmetic and geometric progressions, arithmetic and geometric means, sums of finite arithmetic and geometric progressions, infinite geometric series, sum of the first n natural numbers, sums of squares and cubes of the first n natural numbers",
      "Logarithms and their properties",
      "Permutations and combinations",
      "Binomial theorem for a positive integral index",
      "Properties of binomial coefficients"
    ],
    "Matrices": [
      "Matrices as a rectangular array of real numbers",
      "Equality of matrices",
      "Addition, multiplication by a scalar and product of matrices",
      "Transpose of a matrix",
      "Elementary row and column transformations",
      "Determinant of a square matrix of order up to three",
      "Adjoint of a matrix",
      "Inverse of a square matrix of order up to three",
      "Properties of these matrix operations",
      "Diagonal, symmetric and skew-symmetric matrices and their properties",
      "Solutions of simultaneous linear equations in two or three variables"
    ],
    "Probability and Statistics": [
      "Random experiment, sample space, different types of events (impossible, simple, compound)",
      "Addition and multiplication rules of probability",
      "Conditional probability",
      "Independence of events",
      "Total probability",
      "Bayes Theorem",
      "Computation of probability of events using permutations and combinations",
      "Measure of central tendency and dispersion, mean, median, mode",
      "Mean deviation, standard deviation and variance of grouped and ungrouped data",
      "Analysis of the frequency distribution with same mean but different variance",
      "Random variable, mean and variance of the random variable"
    ],
    "Trigonometry": [
      "Trigonometric functions, their periodicity and graphs",
      "Addition and subtraction formulae",
      "Formulae involving multiple and sub-multiple angles",
      "General solution of trigonometric equations",
      "Inverse trigonometric functions (principal value only) and their elementary properties"
    ],
    "Analytical Geometry": [
      "Two dimensions: Cartesian coordinates, distance between two points, section formulae, shift of origin",
      "Equation of a straight line in various forms, angle between two lines, distance of a point from a line",
      "Lines through the point of intersection of two given lines, equation of the bisector of the angle between two lines, concurrency of lines",
      "Centroid, orthocentre, incentre and circumcentre of a triangle",
      "Equation of a circle in various forms, equations of tangent, normal and chord",
      "Parametric equations of a circle, intersection of a circle with a straight line or a circle, equation of a circle through the points of intersection of two circles and those of a circle and a straight line",
      "Equations of a parabola, ellipse and hyperbola in standard form, their foci, directrices and eccentricity, parametric equations, equations of tangent and normal",
      "Locus problems",
      "Three dimensions: Distance between two points, direction cosines and direction ratios, equation of a straight line in space, skew lines, shortest distance between two lines, equation of a plane, distance of a point from a plane, angle between two lines, angle between two planes, angle between a line and the plane, coplanar lines"
    ],
    "Differential Calculus": [
      "Limit of a function at a real number, continuity of a function, limit and continuity of the sum, difference, product and quotient of two functions",
      "L’Hospital rule of evaluation of limits of functions",
      "Continuity of composite functions, intermediate value property of continuous functions",
      "Derivative of a function, derivative of the sum, difference, product and quotient of two functions, chain rule, derivatives of polynomial, rational, trigonometric, inverse trigonometric, exponential and logarithmic functions",
      "Tangents and normals, increasing and decreasing functions, derivatives of order two, maximum and minimum values of a function, Rolle’s theorem and Lagrange’s mean value theorem, geometric interpretation of the two theorems, derivatives up to order two of implicit functions, geometric interpretation of derivatives"
    ],
    "Integral Calculus": [
      "Integration as the inverse process of differentiation, indefinite integrals of standard functions, definite integrals as the limit of sums, definite integral and their properties, fundamental theorem of integral calculus",
      "Integration by parts, integration by the methods of substitution and partial fractions, application of definite integrals to the determination of areas bounded by simple curves",
      "Formation of ordinary differential equations, solution of homogeneous differential equations of first order and first degree, separation of variables method, linear first order differential equations"
    ],
    "Vectors": [
      "Addition of vectors, scalar multiplication, dot and cross products, scalar and vector triple products, and their geometrical interpretations"
    ]
  },
  "Physics": {
    "General": [
      "Units and dimensions",
      "Dimensional analysis",
      "Least count and significant figures",
      "Error analysis for physical quantities",
      "Experiments using Vernier calipers and screw gauge",
      "Determination of g using simple pendulum",
      "Young's modulus - elasticity of material",
      "Surface tension of water by capillary rise",
      "Effect of detergents on surface tension",
      "Specific heat of liquid using calorimeter",
      "Focal length of concave mirror using u-v method",
      "Focal length of convex lens using u-v method", 
      "Speed of sound using resonance column",
      "Verification of Ohm's law",
      "Specific resistance using meter bridge",
      "Specific resistance using post office box"
    ],
    "Mechanics": [
      "Kinematics in one and two dimensions (Cartesian coordinates only), projectiles",
      "Uniform circular motion",
      "Relative velocity",
      "Newton’s laws of motion",
      "Inertial and uniformly accelerated frames of reference",
      "Static and dynamic friction",
      "Kinetic and potential energy",
      "Work and power",
      "Conservation of linear momentum and mechanical energy",
      "Systems of particles",
      "Centre of mass and its motion",
      "Impulse",
      "Elastic and inelastic collisions",
      "Rigid body, moment of inertia, parallel and perpendicular axes theorems",
      "Moment of inertia of uniform bodies with simple geometrical shapes",
      "Angular momentum",
      "Torque",
      "Conservation of angular momentum",
      "Dynamics of rigid bodies with fixed axis of rotation",
      "Rolling without slipping of rings, cylinders and spheres",
      "Equilibrium of rigid bodies",
      "Collision of point masses with rigid bodies",
      "Forced and damped oscillation (in one dimension)",
      "Resonance",
      "Linear and angular simple harmonic motions",
      "Hooke’s law",
      "Young’s modulus",
      "Law of gravitation",
      "Gravitational potential and field",
      "Acceleration due to gravity",
      "Kepler’s law",
      "Geostationary orbits",
      "Motion of planets and satellites in circular orbits",
      "Escape velocity",
      "Pressure in a fluid",
      "Pascal’s law",
      "Buoyancy",
      "Surface energy and surface tension, angle of contact, drops, bubbles and capillary rise",
      "Viscosity (Poiseuille’s equation excluded)",
      "Modulus of rigidity and bulk modulus in mechanics",
      "Stoke’s law",
      "Terminal velocity",
      "Streamline flow",
      "Equation of continuity",
      "Bernoulli’s theorem and its applications",
      "Wave motion (plane waves only), longitudinal and transverse waves, superposition of waves",
      "Progressive and stationary waves",
      "Vibration of strings and air columns",
      "Resonance",
      "Beats",
      "Speed of sound in gases",
      "Doppler effect (in sound)"
    ],
    "Thermal Physics": [
      "Thermal expansion of solids, liquids and gases",
      "Calorimetry, latent heat",
      "Heat conduction in one dimension",
      "Elementary concepts of convection and radiation",
      "Newton’s law of cooling",
      "Ideal gas laws",
      "Specific heats (Cv and Cp for monoatomic and diatomic gases)",
      "Isothermal and adiabatic processes, bulk modulus of gases",
      "Equivalence of heat and work",
      "First law of thermodynamics and its applications (only for ideal gases)",
      "Second law of thermodynamics, reversible and irreversible processes, Carnot engine and its efficiency",
      "Blackbody radiation: absorptive and emissive powers",
      "Kirchhoff’s law",
      "Wien’s displacement law",
      "Stefan’s law"
    ],
    "Electricity and Magnetism": [
      "Coulomb’s law",
      "Electric field and potential",
      "Electrical potential energy of a system of point charges and of electrical dipoles in a uniform electrostatic field",
      "Electric field lines",
      "Flux of electric field",
      "Gauss’s law and its application in simple cases, such as, to find field due to infinitely long straight wire, uniformly charged infinite plane sheet and uniformly charged thin spherical shell",
      "Capacitance",
      "Parallel plate capacitor with and without dielectrics",
      "Capacitors in series and parallel",
      "Energy stored in a capacitor",
      "Electric current",
      "Ohm’s law",
      "Series and parallel arrangements of resistances and cells",
      "Kirchhoff’s laws and simple applications",
      "Heating effect of current",
      "Biot–Savart’s law and Ampere’s law",
      "Magnetic field near a current-carrying straight wire, along the axis of a circular coil and inside a long straight solenoid",
      "Force on a moving charge and on a current-carrying wire in a uniform magnetic field",
      "Magnetic moment of a current loop",
      "Effect of a uniform magnetic field on a current loop",
      "Moving coil galvanometer, voltmeter, ammeter and their conversions",
      "Electromagnetic induction: Faraday’s law, Lenz’s law",
      "Self and mutual inductance",
      "RC, LR, LC and LCR (in series) circuits with d.c. and a.c. sources"
    ],
    "Electromagnetic Waves": [
      "Electromagnetic waves and their characteristics",
      "Electromagnetic spectrum (radio waves, microwaves, infrared, visible, ultraviolet, x-rays, gamma rays) including elementary facts about their uses"
    ],
    "Optics": [
      "Rectilinear propagation of light",
      "Reflection and refraction at plane and spherical surfaces",
      "Total internal reflection",
      "Deviation and dispersion of light by a prism",
      "Thin lenses",
      "Combinations of mirrors and thin lenses",
      "Magnification",
      "Wave nature of light: Huygen’s principle, interference limited to Young’s double slit experiment",
      "Diffraction due to a single slit",
      "Polarization of light, plane polarized light",
      "Brewster's law, Polaroids"
    ],
    "Modern Physics": [
      "Atomic nucleus",
      "α, β and γ radiations",
      "Law of radioactive decay",
      "Decay constant",
      "Half-life and mean life",
      "Binding energy and its calculation",
      "Fission and fusion processes",
      "Energy calculation in these processes",
      "Photoelectric effect",
      "Bohr’s theory of hydrogen-like atoms",
      "Characteristic and continuous X-rays",
      "Moseley’s law",
      "de Broglie wavelength of matter waves"
    ]
  }
};

const Index = () => {
  const { toast } = useToast();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [sortBy, setSortBy] = useState('chapter');
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [showSelected, setShowSelected] = useState(false);

  const toggleItem = (itemId: string) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(itemId)) {
      newCheckedItems.delete(itemId);
    } else {
      newCheckedItems.add(itemId);
    }
    setCheckedItems(newCheckedItems);
  };

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const toggleAllChapters = () => {
    if (expandedChapters.size > 0) {
      setExpandedChapters(new Set());
    } else {
      const allChapters = new Set<string>();
      Object.entries(syllabusData).forEach(([subject, chapters]) => {
        Object.keys(chapters).forEach(chapter => {
          allChapters.add(`${subject}-${chapter}`);
        });
      });
      setExpandedChapters(allChapters);
    }
  };

  const copyToClipboard = () => {
    const selectedTopics = Array.from(checkedItems).join('\n');
    navigator.clipboard.writeText(selectedTopics);
    toast({
      title: "Copied to clipboard!",
      description: `${checkedItems.size} topics copied successfully.`,
    });
  };

  const getSelectedTopics = () => {
    return Array.from(checkedItems);
  };

  const renderTopics = (topics: any, chapterId: string) => {
    if (Array.isArray(topics)) {
      return topics
        .filter(topic =>
          topic.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((topic, index) => {
          const topicId = `${chapterId}-${topic}`;
          const isChecked = checkedItems.has(topicId);
          
          return (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-colors">
              <div 
                className="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => toggleItem(topicId)}
              >
                {isChecked && <CheckCircle2 className="h-4 w-4 text-green-600" />}
              </div>
              <span className="flex-1 text-sm text-gray-800">{topic}</span>
            </div>
          );
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto p-6 max-w-6xl">
        <Card className="backdrop-blur-md bg-white/90 border-white/20 shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 rounded-full bg-gradient-to-r from-primary to-secondary">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                JEE Advanced 2025 Syllabus Checklist
              </CardTitle>
            </div>
            <p className="text-lg text-muted-foreground">
              Track your preparation progress across all subjects
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2 w-full lg:w-auto">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/80 backdrop-blur-sm border-white/30 focus:border-primary/50"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 items-center">
                <Button 
                  onClick={toggleAllChapters}
                  variant="outline"
                  className="bg-white/80 backdrop-blur-sm border-white/30 hover:bg-white/90 text-gray-800"
                >
                  {expandedChapters.size > 0 ? 'Collapse All' : 'Expand All'}
                </Button>

                <Button 
                  onClick={() => setShowSelected(!showSelected)}
                  variant="outline"
                  className="bg-white/80 backdrop-blur-sm border-white/30 hover:bg-white/90 text-gray-800"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {showSelected ? 'Show All' : 'View Selected'}
                </Button>

                <Button 
                  onClick={copyToClipboard}
                  disabled={checkedItems.size === 0}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Selected ({checkedItems.size})
                </Button>
              </div>
            </div>

            {/* Selected Topics View */}
            {showSelected && (
              <Card className="bg-white/80 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Selected Topics ({checkedItems.size})</CardTitle>
                </CardHeader>
                <CardContent>
                  {checkedItems.size === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No topics selected yet.</p>
                  ) : (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {getSelectedTopics().map((topic, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-2 p-2 rounded-lg bg-white/60 text-gray-800"
                        >
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{topic}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Subject Tabs */}
            {!showSelected && (
              <Tabs defaultValue="Chemistry" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
                  <TabsTrigger value="Chemistry" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-400 data-[state=active]:to-red-600 data-[state=active]:text-white">
                    <Atom className="h-4 w-4 mr-2" />
                    Chemistry
                  </TabsTrigger>
                  <TabsTrigger value="Mathematics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-blue-600 data-[state=active]:text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Mathematics
                  </TabsTrigger>
                  <TabsTrigger value="Physics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-green-600 data-[state=active]:text-white">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Physics
                  </TabsTrigger>
                </TabsList>

                {Object.entries(syllabusData).map(([subject, chapters]) => (
                  <TabsContent key={subject} value={subject} className="mt-6">
                    <div className="space-y-4">
                      {Object.entries(chapters).map(([chapterName, topics]) => {
                        const chapterId = `${subject}-${chapterName}`;
                        
                        return (
                          <Card key={chapterId} className="bg-white/80 backdrop-blur-sm border-white/30 overflow-hidden">
                            <Collapsible 
                              open={expandedChapters.has(chapterId)}
                              onOpenChange={() => toggleChapter(chapterId)}
                            >
                              <CollapsibleTrigger className="w-full">
                                <div className="flex items-center justify-between p-4 hover:bg-white/90 transition-colors">
                                  <div className="flex items-center gap-3">
                                    <h3 className="text-lg font-semibold text-gray-800">{chapterName}</h3>
                                    <Badge variant="secondary" className="bg-white/60 text-gray-800">
                                      {Array.isArray(topics) ? topics.length : 0} topics
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {expandedChapters.has(chapterId) ? (
                                      <ChevronDown className="h-4 w-4 text-gray-800" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4 text-gray-800" />
                                    )}
                                  </div>
                                </div>
                              </CollapsibleTrigger>
                              
                              <CollapsibleContent>
                                <div className="px-4 pb-4 space-y-2">
                                  <Separator className="mb-4" />
                                  {renderTopics(topics, chapterId)}
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
