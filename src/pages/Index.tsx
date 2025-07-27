import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Search, Copy, CheckSquare, Square, BookOpen, Filter, SortAsc } from 'lucide-react';

interface SubTopic {
  id: string;
  name: string;
}

interface Topic {
  id: string;
  name: string;
  subtopics?: SubTopic[];
}

interface Chapter {
  id: string;
  name: string;
  topics: Topic[];
}

interface Subject {
  id: string;
  name: string;
  className: string;
  chapters: Chapter[];
}

const syllabusData: Subject[] = [
  {
    id: 'physics',
    name: 'Physics',
    className: 'subject-physics',
    chapters: [
      {
        id: 'general-physics',
        name: 'General',
        topics: [
          {
            id: 'units-dimensions',
            name: 'Units and Dimensions',
            subtopics: [
              { id: 'dimensional-analysis', name: 'Dimensional analysis' },
              { id: 'least-count', name: 'Least count and significant figures' },
              { id: 'error-analysis', name: 'Error analysis for physical quantities' }
            ]
          },
          {
            id: 'practical-experiments',
            name: 'Practical Experiments',
            subtopics: [
              { id: 'vernier-screw', name: 'Vernier calipers and screw gauge measurements' },
              { id: 'pendulum-g', name: 'Determination of g using simple pendulum' },
              { id: 'youngs-modulus', name: "Young's modulus - elasticity of material" },
              { id: 'surface-tension', name: 'Surface tension by capillary rise' },
              { id: 'specific-heat', name: 'Specific heat using calorimeter' },
              { id: 'focal-length', name: 'Focal length of concave mirror and convex lens' },
              { id: 'sound-speed', name: 'Speed of sound using resonance column' },
              { id: 'ohms-law', name: "Verification of Ohm's law" },
              { id: 'specific-resistance', name: 'Specific resistance using meter bridge' }
            ]
          }
        ]
      },
      {
        id: 'mechanics',
        name: 'Mechanics',
        topics: [
          {
            id: 'kinematics',
            name: 'Kinematics',
            subtopics: [
              { id: 'motion-1d-2d', name: 'Motion in one and two dimensions' },
              { id: 'projectiles', name: 'Projectile motion' },
              { id: 'circular-motion', name: 'Uniform circular motion' },
              { id: 'relative-velocity', name: 'Relative velocity' }
            ]
          },
          {
            id: 'newtons-laws',
            name: "Newton's Laws and Forces",
            subtopics: [
              { id: 'three-laws', name: "Newton's three laws of motion" },
              { id: 'reference-frames', name: 'Inertial and uniformly accelerated frames' },
              { id: 'friction', name: 'Static and dynamic friction' }
            ]
          },
          {
            id: 'work-energy',
            name: 'Work and Energy',
            subtopics: [
              { id: 'kinetic-potential', name: 'Kinetic and potential energy' },
              { id: 'work-power', name: 'Work and power' },
              { id: 'conservation-energy', name: 'Conservation of mechanical energy' },
              { id: 'conservation-momentum', name: 'Conservation of linear momentum' }
            ]
          },
          {
            id: 'particle-systems',
            name: 'Systems of Particles',
            subtopics: [
              { id: 'center-mass', name: 'Centre of mass and its motion' },
              { id: 'impulse', name: 'Impulse' },
              { id: 'collisions', name: 'Elastic and inelastic collisions' }
            ]
          },
          {
            id: 'rigid-body',
            name: 'Rigid Body Mechanics',
            subtopics: [
              { id: 'moment-inertia', name: 'Moment of inertia' },
              { id: 'parallel-perpendicular-axes', name: 'Parallel and perpendicular axes theorems' },
              { id: 'uniform-bodies-inertia', name: 'Moment of inertia of uniform geometrical bodies' },
              { id: 'angular-momentum', name: 'Angular momentum' },
              { id: 'torque', name: 'Torque' },
              { id: 'conservation-angular', name: 'Conservation of angular momentum' },
              { id: 'fixed-axis-rotation', name: 'Dynamics of rigid bodies with fixed axis' },
              { id: 'rolling-motion', name: 'Rolling without slipping (rings, cylinders, spheres)' },
              { id: 'equilibrium-rigid', name: 'Equilibrium of rigid bodies' },
              { id: 'collision-rigid', name: 'Collision of point masses with rigid bodies' }
            ]
          },
          {
            id: 'oscillations',
            name: 'Oscillations',
            subtopics: [
              { id: 'shm-linear', name: 'Linear simple harmonic motion' },
              { id: 'shm-angular', name: 'Angular simple harmonic motion' },
              { id: 'forced-oscillation', name: 'Forced oscillation (one dimension)' },
              { id: 'damped-oscillation', name: 'Damped oscillation (one dimension)' },
              { id: 'resonance', name: 'Resonance' }
            ]
          },
          {
            id: 'properties-matter',
            name: 'Properties of Matter',
            subtopics: [
              { id: 'hookes-law', name: "Hooke's law" },
              { id: 'youngs-modulus-theory', name: "Young's modulus" },
              { id: 'modulus-rigidity', name: 'Modulus of rigidity and bulk modulus' }
            ]
          },
          {
            id: 'gravitation',
            name: 'Gravitation',
            subtopics: [
              { id: 'law-gravitation', name: 'Law of gravitation' },
              { id: 'gravitational-field', name: 'Gravitational potential and field' },
              { id: 'acceleration-gravity', name: 'Acceleration due to gravity' },
              { id: 'keplers-law', name: "Kepler's laws" },
              { id: 'geostationary-orbits', name: 'Geostationary orbits' },
              { id: 'planetary-motion', name: 'Motion of planets and satellites' },
              { id: 'escape-velocity', name: 'Escape velocity' }
            ]
          },
          {
            id: 'fluid-mechanics',
            name: 'Fluid Mechanics',
            subtopics: [
              { id: 'pressure-fluid', name: 'Pressure in fluid' },
              { id: 'pascals-law', name: "Pascal's law" },
              { id: 'buoyancy', name: 'Buoyancy' },
              { id: 'surface-energy', name: 'Surface energy and surface tension' },
              { id: 'contact-angle', name: 'Angle of contact, drops, bubbles' },
              { id: 'capillary-rise', name: 'Capillary rise' },
              { id: 'viscosity', name: 'Viscosity' },
              { id: 'stokes-law', name: "Stoke's law" },
              { id: 'terminal-velocity', name: 'Terminal velocity' },
              { id: 'streamline-flow', name: 'Streamline flow' },
              { id: 'continuity-equation', name: 'Equation of continuity' },
              { id: 'bernoullis-theorem', name: "Bernoulli's theorem and applications" }
            ]
          },
          {
            id: 'wave-motion',
            name: 'Wave Motion',
            subtopics: [
              { id: 'plane-waves', name: 'Wave motion (plane waves only)' },
              { id: 'longitudinal-transverse', name: 'Longitudinal and transverse waves' },
              { id: 'superposition', name: 'Superposition of waves' },
              { id: 'progressive-stationary', name: 'Progressive and stationary waves' },
              { id: 'string-vibration', name: 'Vibration of strings and air columns' },
              { id: 'resonance-waves', name: 'Resonance' },
              { id: 'beats', name: 'Beats' },
              { id: 'sound-speed', name: 'Speed of sound in gases' },
              { id: 'doppler-effect', name: 'Doppler effect (in sound)' }
            ]
          }
        ]
      },
      {
        id: 'thermal-physics',
        name: 'Thermal Physics',
        topics: [
          {
            id: 'thermal-expansion',
            name: 'Thermal Expansion',
            subtopics: [
              { id: 'expansion-solids', name: 'Thermal expansion of solids' },
              { id: 'expansion-liquids', name: 'Thermal expansion of liquids' },
              { id: 'expansion-gases', name: 'Thermal expansion of gases' }
            ]
          },
          {
            id: 'calorimetry',
            name: 'Calorimetry and Heat Transfer',
            subtopics: [
              { id: 'calorimetry-theory', name: 'Calorimetry' },
              { id: 'latent-heat', name: 'Latent heat' },
              { id: 'heat-conduction', name: 'Heat conduction in one dimension' },
              { id: 'convection', name: 'Elementary concepts of convection' },
              { id: 'radiation', name: 'Elementary concepts of radiation' },
              { id: 'newtons-cooling', name: "Newton's law of cooling" }
            ]
          },
          {
            id: 'kinetic-theory',
            name: 'Kinetic Theory and Thermodynamics',
            subtopics: [
              { id: 'ideal-gas-laws', name: 'Ideal gas laws' },
              { id: 'specific-heats', name: 'Specific heats (Cv and Cp)' },
              { id: 'isothermal-adiabatic', name: 'Isothermal and adiabatic processes' },
              { id: 'bulk-modulus-gas', name: 'Bulk modulus of gases' },
              { id: 'heat-work-equivalence', name: 'Equivalence of heat and work' },
              { id: 'first-law', name: 'First law of thermodynamics' },
              { id: 'second-law', name: 'Second law of thermodynamics' },
              { id: 'reversible-irreversible', name: 'Reversible and irreversible processes' },
              { id: 'carnot-engine', name: 'Carnot engine and efficiency' }
            ]
          },
          {
            id: 'blackbody-radiation',
            name: 'Blackbody Radiation',
            subtopics: [
              { id: 'absorptive-emissive', name: 'Absorptive and emissive powers' },
              { id: 'kirchhoffs-law', name: "Kirchhoff's law" },
              { id: 'wiens-law', name: "Wien's displacement law" },
              { id: 'stefans-law', name: "Stefan's law" }
            ]
          }
        ]
      },
      {
        id: 'electricity-magnetism',
        name: 'Electricity and Magnetism',
        topics: [
          {
            id: 'electrostatics',
            name: 'Electrostatics',
            subtopics: [
              { id: 'coulombs-law', name: "Coulomb's law" },
              { id: 'electric-field', name: 'Electric field and potential' },
              { id: 'potential-energy', name: 'Electrical potential energy' },
              { id: 'field-lines', name: 'Electric field lines' },
              { id: 'electric-flux', name: 'Flux of electric field' },
              { id: 'gauss-law', name: "Gauss's law and applications" }
            ]
          },
          {
            id: 'capacitance',
            name: 'Capacitance',
            subtopics: [
              { id: 'capacitance-theory', name: 'Capacitance' },
              { id: 'parallel-plate', name: 'Parallel plate capacitor' },
              { id: 'dielectrics', name: 'Capacitors with and without dielectrics' },
              { id: 'series-parallel-cap', name: 'Capacitors in series and parallel' },
              { id: 'energy-capacitor', name: 'Energy stored in capacitor' }
            ]
          },
          {
            id: 'current-electricity',
            name: 'Current Electricity',
            subtopics: [
              { id: 'electric-current', name: 'Electric current' },
              { id: 'ohms-law-theory', name: "Ohm's law" },
              { id: 'series-parallel-circuits', name: 'Series and parallel arrangements' },
              { id: 'kirchhoffs-laws', name: "Kirchhoff's laws and applications" },
              { id: 'heating-effect', name: 'Heating effect of current' }
            ]
          },
          {
            id: 'magnetism',
            name: 'Magnetism',
            subtopics: [
              { id: 'biot-savart', name: "Biot-Savart's law" },
              { id: 'amperes-law', name: "Ampere's law" },
              { id: 'magnetic-field-wire', name: 'Magnetic field near current-carrying wire' },
              { id: 'magnetic-field-coil', name: 'Magnetic field along axis of circular coil' },
              { id: 'magnetic-field-solenoid', name: 'Magnetic field inside solenoid' },
              { id: 'force-moving-charge', name: 'Force on moving charge in magnetic field' },
              { id: 'force-current-wire', name: 'Force on current-carrying wire' }
            ]
          },
          {
            id: 'magnetic-effects',
            name: 'Magnetic Effects',
            subtopics: [
              { id: 'magnetic-moment', name: 'Magnetic moment of current loop' },
              { id: 'uniform-field-effect', name: 'Effect of uniform magnetic field on current loop' },
              { id: 'galvanometer', name: 'Moving coil galvanometer' },
              { id: 'voltmeter-ammeter', name: 'Voltmeter and ammeter conversions' }
            ]
          },
          {
            id: 'electromagnetic-induction',
            name: 'Electromagnetic Induction',
            subtopics: [
              { id: 'faradays-law', name: "Faraday's law" },
              { id: 'lenz-law', name: "Lenz's law" },
              { id: 'self-mutual-inductance', name: 'Self and mutual inductance' },
              { id: 'rc-circuits', name: 'RC circuits with DC and AC' },
              { id: 'lr-circuits', name: 'LR circuits with DC and AC' },
              { id: 'lc-circuits', name: 'LC circuits with DC and AC' },
              { id: 'lcr-circuits', name: 'LCR circuits in series with DC and AC' }
            ]
          }
        ]
      },
      {
        id: 'electromagnetic-waves',
        name: 'Electromagnetic Waves',
        topics: [
          {
            id: 'em-wave-properties',
            name: 'Electromagnetic Wave Properties',
            subtopics: [
              { id: 'em-characteristics', name: 'Electromagnetic waves and characteristics' }
            ]
          },
          {
            id: 'em-spectrum',
            name: 'Electromagnetic Spectrum',
            subtopics: [
              { id: 'radio-waves', name: 'Radio waves' },
              { id: 'microwaves', name: 'Microwaves' },
              { id: 'infrared', name: 'Infrared' },
              { id: 'visible-light', name: 'Visible light' },
              { id: 'ultraviolet', name: 'Ultraviolet' },
              { id: 'x-rays', name: 'X-rays' },
              { id: 'gamma-rays', name: 'Gamma rays' },
              { id: 'spectrum-uses', name: 'Elementary facts about their uses' }
            ]
          }
        ]
      },
      {
        id: 'optics',
        name: 'Optics',
        topics: [
          {
            id: 'geometric-optics',
            name: 'Geometric Optics',
            subtopics: [
              { id: 'rectilinear-propagation', name: 'Rectilinear propagation of light' },
              { id: 'reflection-refraction', name: 'Reflection and refraction at surfaces' },
              { id: 'total-internal-reflection', name: 'Total internal reflection' },
              { id: 'deviation-dispersion', name: 'Deviation and dispersion by prism' },
              { id: 'thin-lenses', name: 'Thin lenses' },
              { id: 'mirror-lens-combinations', name: 'Combinations of mirrors and lenses' },
              { id: 'magnification', name: 'Magnification' }
            ]
          },
          {
            id: 'wave-optics',
            name: 'Wave Optics',
            subtopics: [
              { id: 'wave-nature', name: 'Wave nature of light' },
              { id: 'huygens-principle', name: "Huygen's principle" },
              { id: 'youngs-experiment', name: "Young's double slit experiment" },
              { id: 'single-slit-diffraction', name: 'Diffraction due to single slit' },
              { id: 'polarization', name: 'Polarization of light' },
              { id: 'brewsters-law', name: "Brewster's law" },
              { id: 'polaroids', name: 'Polaroids' }
            ]
          }
        ]
      },
      {
        id: 'modern-physics',
        name: 'Modern Physics',
        topics: [
          {
            id: 'atomic-nucleus',
            name: 'Atomic Nucleus',
            subtopics: [
              { id: 'nucleus-structure', name: 'Atomic nucleus structure' },
              { id: 'alpha-beta-gamma', name: 'α, β and γ radiations' },
              { id: 'radioactive-decay', name: 'Law of radioactive decay' },
              { id: 'decay-constant', name: 'Decay constant' },
              { id: 'half-life', name: 'Half-life and mean life' },
              { id: 'binding-energy', name: 'Binding energy and calculation' },
              { id: 'fission-fusion', name: 'Fission and fusion processes' },
              { id: 'energy-calculation', name: 'Energy calculation in nuclear processes' }
            ]
          },
          {
            id: 'quantum-physics',
            name: 'Quantum Physics',
            subtopics: [
              { id: 'photoelectric-effect', name: 'Photoelectric effect' },
              { id: 'bohr-theory', name: "Bohr's theory of hydrogen-like atoms" },
              { id: 'characteristic-xrays', name: 'Characteristic and continuous X-rays' },
              { id: 'moseleys-law', name: "Moseley's law" },
              { id: 'de-broglie', name: 'de Broglie wavelength of matter waves' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    className: 'subject-chemistry',
    chapters: [
      {
        id: 'general-chemistry',
        name: 'General Topics',
        topics: [
          {
            id: 'basic-concepts',
            name: 'Basic Concepts',
            subtopics: [
              { id: 'atoms-molecules', name: 'Concept of atoms and molecules' },
              { id: 'dalton-theory', name: "Dalton's atomic theory" },
              { id: 'mole-concept', name: 'Mole concept' },
              { id: 'chemical-formulae', name: 'Chemical formulae' },
              { id: 'balanced-equations', name: 'Balanced chemical equations' }
            ]
          },
          {
            id: 'stoichiometry',
            name: 'Stoichiometry and Calculations',
            subtopics: [
              { id: 'oxidation-reduction', name: 'Oxidation-reduction reactions' },
              { id: 'neutralization', name: 'Neutralisation reactions' },
              { id: 'displacement', name: 'Displacement reactions' },
              { id: 'concentration-terms', name: 'Concentration in different terms' },
              { id: 'mole-fraction', name: 'Mole fraction' },
              { id: 'molarity', name: 'Molarity' },
              { id: 'molality', name: 'Molality' },
              { id: 'normality', name: 'Normality' }
            ]
          }
        ]
      },
      {
        id: 'states-matter',
        name: 'States of Matter: Gases and Liquids',
        topics: [
          {
            id: 'gas-laws',
            name: 'Gas Laws',
            subtopics: [
              { id: 'gas-laws-theory', name: 'Gas laws and ideal gas equation' },
              { id: 'absolute-temperature', name: 'Absolute scale of temperature' },
              { id: 'deviation-ideality', name: 'Deviation from ideality' },
              { id: 'van-der-waals', name: 'van der Waals equation' }
            ]
          },
          {
            id: 'kinetic-theory-gases',
            name: 'Kinetic Theory of Gases',
            subtopics: [
              { id: 'kinetic-theory', name: 'Kinetic theory of gases' },
              { id: 'molecular-velocities', name: 'Average, RMS and most probable velocities' },
              { id: 'velocity-temperature', name: 'Relation of velocities with temperature' },
              { id: 'partial-pressures', name: 'Law of partial pressures' },
              { id: 'gas-diffusion', name: 'Diffusion of gases' }
            ]
          },
          {
            id: 'intermolecular-interactions',
            name: 'Intermolecular Interactions',
            subtopics: [
              { id: 'interaction-types', name: 'Types of intermolecular interactions' },
              { id: 'distance-dependence', name: 'Distance dependence of interactions' },
              { id: 'effect-properties', name: 'Effect on properties' }
            ]
          },
          {
            id: 'liquid-properties',
            name: 'Liquid Properties',
            subtopics: [
              { id: 'vapour-pressure', name: 'Vapour pressure' },
              { id: 'surface-tension-liquids', name: 'Surface tension' },
              { id: 'viscosity-liquids', name: 'Viscosity' }
            ]
          }
        ]
      },
      {
        id: 'atomic-structure-chem',
        name: 'Atomic Structure',
        topics: [
          {
            id: 'bohr-model',
            name: 'Bohr Model',
            subtopics: [
              { id: 'bohr-model-theory', name: 'Bohr model' },
              { id: 'hydrogen-spectrum', name: 'Spectrum of hydrogen atom' }
            ]
          },
          {
            id: 'quantum-mechanics',
            name: 'Quantum Mechanical Model',
            subtopics: [
              { id: 'wave-particle-duality', name: 'Wave-particle duality' },
              { id: 'de-broglie-hypothesis', name: 'de Broglie hypothesis' },
              { id: 'uncertainty-principle', name: 'Uncertainty principle' },
              { id: 'quantum-picture', name: 'Qualitative quantum mechanical picture' },
              { id: 'energy-levels', name: 'Energies and quantum numbers' },
              { id: 'wave-functions', name: 'Wave function and probability density' },
              { id: 'orbital-shapes', name: 'Shapes of s, p and d orbitals' }
            ]
          },
          {
            id: 'electronic-configuration',
            name: 'Electronic Configuration',
            subtopics: [
              { id: 'aufbau-principle', name: 'Aufbau principle' },
              { id: 'pauli-exclusion', name: "Pauli's exclusion principle" },
              { id: 'hund-rule', name: "Hund's rule" }
            ]
          }
        ]
      },
      {
        id: 'chemical-bonding',
        name: 'Chemical Bonding and Molecular Structure',
        topics: [
          {
            id: 'covalent-bonding',
            name: 'Covalent Bonding',
            subtopics: [
              { id: 'orbital-overlap', name: 'Orbital overlap and covalent bond' },
              { id: 'hybridisation', name: 'Hybridisation involving s, p and d orbitals' },
              { id: 'molecular-orbital', name: 'Molecular orbital energy diagrams' },
              { id: 'homonuclear-diatomic', name: 'Homonuclear diatomic species (up to Ne2)' }
            ]
          },
          {
            id: 'intermolecular-forces',
            name: 'Intermolecular Forces',
            subtopics: [
              { id: 'hydrogen-bond', name: 'Hydrogen bond' },
              { id: 'molecular-polarity', name: 'Polarity in molecules' },
              { id: 'dipole-moment', name: 'Dipole moment' }
            ]
          },
          {
            id: 'molecular-geometry',
            name: 'Molecular Geometry',
            subtopics: [
              { id: 'vsepr-model', name: 'VSEPR model' },
              { id: 'linear-shape', name: 'Linear molecular shape' },
              { id: 'angular-shape', name: 'Angular molecular shape' },
              { id: 'triangular-shape', name: 'Triangular molecular shape' },
              { id: 'square-planar', name: 'Square planar shape' },
              { id: 'pyramidal-shape', name: 'Pyramidal shape' },
              { id: 'square-pyramidal', name: 'Square pyramidal shape' },
              { id: 'trigonal-bipyramidal', name: 'Trigonal bipyramidal shape' },
              { id: 'tetrahedral-shape', name: 'Tetrahedral shape' },
              { id: 'octahedral-shape', name: 'Octahedral shape' }
            ]
          }
        ]
      },
      {
        id: 'thermodynamics-chem',
        name: 'Chemical Thermodynamics',
        topics: [
          {
            id: 'thermodynamic-properties',
            name: 'Thermodynamic Properties',
            subtopics: [
              { id: 'intensive-extensive', name: 'Intensive and extensive properties' },
              { id: 'state-functions', name: 'State functions' },
              { id: 'first-law-thermo', name: 'First law of thermodynamics' }
            ]
          },
          {
            id: 'energy-work-heat',
            name: 'Energy, Work and Heat',
            subtopics: [
              { id: 'internal-energy', name: 'Internal energy' },
              { id: 'work-pv', name: 'Work (pressure-volume only)' },
              { id: 'heat-transfer', name: 'Heat transfer' },
              { id: 'enthalpy', name: 'Enthalpy' },
              { id: 'heat-capacity', name: 'Heat capacity' },
              { id: 'standard-state', name: 'Standard state' },
              { id: 'hess-law', name: "Hess's law" }
            ]
          },
          {
            id: 'enthalpy-changes',
            name: 'Enthalpy Changes',
            subtopics: [
              { id: 'enthalpy-reaction', name: 'Enthalpy of reaction' },
              { id: 'enthalpy-fusion', name: 'Enthalpy of fusion' },
              { id: 'enthalpy-vapourization', name: 'Enthalpy of vapourization' },
              { id: 'lattice-enthalpy', name: 'Lattice enthalpy' }
            ]
          },
          {
            id: 'second-law-entropy',
            name: 'Second Law and Entropy',
            subtopics: [
              { id: 'second-law-thermo', name: 'Second law of thermodynamics' },
              { id: 'entropy', name: 'Entropy' },
              { id: 'gibbs-energy', name: 'Gibbs energy' },
              { id: 'equilibrium-criteria', name: 'Criteria of equilibrium and spontaneity' }
            ]
          }
        ]
      },
      {
        id: 'equilibrium',
        name: 'Chemical and Ionic Equilibrium',
        topics: [
          {
            id: 'chemical-equilibrium',
            name: 'Chemical Equilibrium',
            subtopics: [
              { id: 'mass-action', name: 'Law of mass action' },
              { id: 'delta-g-significance', name: 'Significance of ΔG and ΔG⊖' },
              { id: 'equilibrium-constant', name: 'Equilibrium constant (Kp and Kc)' },
              { id: 'reaction-quotient', name: 'Reaction quotient' },
              { id: 'le-chatelier', name: "Le Chatelier's principle" }
            ]
          },
          {
            id: 'ionic-equilibrium',
            name: 'Ionic Equilibrium',
            subtopics: [
              { id: 'solubility-product', name: 'Solubility product and applications' },
              { id: 'common-ion', name: 'Common ion effect' },
              { id: 'ph-buffer', name: 'pH and buffer solutions' },
              { id: 'acids-bases', name: 'Acids and bases (Brønsted and Lewis)' },
              { id: 'salt-hydrolysis', name: 'Hydrolysis of salts' }
            ]
          }
        ]
      },
      {
        id: 'electrochemistry',
        name: 'Electrochemistry',
        topics: [
          {
            id: 'electrochemical-cells',
            name: 'Electrochemical Cells',
            subtopics: [
              { id: 'cells-reactions', name: 'Electrochemical cells and reactions' },
              { id: 'electrode-potentials', name: 'Standard electrode potentials' },
              { id: 'electrochemical-work', name: 'Electrochemical work' },
              { id: 'nernst-equation', name: 'Nernst equation' },
              { id: 'electrochemical-series', name: 'Electrochemical series' },
              { id: 'galvanic-emf', name: 'EMF of galvanic cells' }
            ]
          },
          {
            id: 'electrolysis',
            name: 'Electrolysis',
            subtopics: [
              { id: 'faradays-laws', name: "Faraday's laws of electrolysis" },
              { id: 'electrolytic-conductance', name: 'Electrolytic conductance' },
              { id: 'specific-conductivity', name: 'Specific, equivalent and molar conductivity' },
              { id: 'kohlrausch-law', name: "Kohlrausch's law" }
            ]
          },
          {
            id: 'applications',
            name: 'Applications',
            subtopics: [
              { id: 'batteries', name: 'Batteries: Primary and Secondary' },
              { id: 'fuel-cells', name: 'Fuel cells' },
              { id: 'corrosion', name: 'Corrosion' }
            ]
          }
        ]
      },
      {
        id: 'chemical-kinetics',
        name: 'Chemical Kinetics',
        topics: [
          {
            id: 'reaction-rates',
            name: 'Reaction Rates',
            subtopics: [
              { id: 'rates-reactions', name: 'Rates of chemical reactions' },
              { id: 'order-molecularity', name: 'Order and molecularity of reactions' },
              { id: 'rate-law', name: 'Rate law, rate constant, half-life' }
            ]
          },
          {
            id: 'rate-expressions',
            name: 'Rate Expressions',
            subtopics: [
              { id: 'differential-integrated', name: 'Differential and integrated rate expressions' },
              { id: 'zero-order', name: 'Zero order reactions' },
              { id: 'first-order', name: 'First order reactions' }
            ]
          },
          {
            id: 'temperature-dependence',
            name: 'Temperature Dependence',
            subtopics: [
              { id: 'arrhenius-equation', name: 'Arrhenius equation' },
              { id: 'activation-energy', name: 'Activation energy' }
            ]
          },
          {
            id: 'catalysis',
            name: 'Catalysis',
            subtopics: [
              { id: 'homogeneous-catalysis', name: 'Homogeneous catalysis' },
              { id: 'heterogeneous-catalysis', name: 'Heterogeneous catalysis' },
              { id: 'catalyst-activity', name: 'Activity and selectivity of solid catalysts' },
              { id: 'enzyme-catalysis', name: 'Enzyme catalysis and mechanism' }
            ]
          }
        ]
      },
      {
        id: 'solid-state',
        name: 'Solid State',
        topics: [
          {
            id: 'crystal-structure',
            name: 'Crystal Structure',
            subtopics: [
              { id: 'solid-classification', name: 'Classification of solids' },
              { id: 'crystalline-state', name: 'Crystalline state' },
              { id: 'crystal-systems', name: 'Seven crystal systems (a, b, c, α, β, γ)' },
              { id: 'close-packed', name: 'Close packed structure of solids' },
              { id: 'cubic-hexagonal', name: 'Cubic and hexagonal close packing' }
            ]
          },
          {
            id: 'lattice-structure',
            name: 'Lattice Structure',
            subtopics: [
              { id: 'fcc-packing', name: 'Packing in FCC lattices' },
              { id: 'bcc-packing', name: 'Packing in BCC lattices' },
              { id: 'hcp-packing', name: 'Packing in HCP lattices' },
              { id: 'nearest-neighbours', name: 'Nearest neighbours' },
              { id: 'ionic-radii', name: 'Ionic radii and radius ratio' },
              { id: 'point-defects', name: 'Point defects' }
            ]
          }
        ]
      },
      {
        id: 'solutions',
        name: 'Solutions',
        topics: [
          {
            id: 'solution-laws',
            name: 'Solution Laws',
            subtopics: [
              { id: 'henry-law', name: "Henry's law" },
              { id: 'raoult-law', name: "Raoult's law" },
              { id: 'ideal-solutions', name: 'Ideal solutions' }
            ]
          },
          {
            id: 'colligative-properties',
            name: 'Colligative Properties',
            subtopics: [
              { id: 'vapour-pressure-lowering', name: 'Lowering of vapour pressure' },
              { id: 'boiling-point-elevation', name: 'Elevation of boiling point' },
              { id: 'freezing-point-depression', name: 'Depression of freezing point' },
              { id: 'osmotic-pressure', name: 'Osmotic pressure' },
              { id: 'van-hoff-factor', name: "van't Hoff factor" }
            ]
          }
        ]
      },
      {
        id: 'surface-chemistry',
        name: 'Surface Chemistry',
        topics: [
          {
            id: 'adsorption',
            name: 'Adsorption',
            subtopics: [
              { id: 'physisorption', name: 'Physisorption' },
              { id: 'chemisorption', name: 'Chemisorption' },
              { id: 'freundlich-isotherm', name: 'Freundlich adsorption isotherm' }
            ]
          },
          {
            id: 'colloids',
            name: 'Colloids',
            subtopics: [
              { id: 'colloid-types', name: 'Types of colloids' },
              { id: 'preparation-methods', name: 'Methods of preparation' },
              { id: 'general-properties', name: 'General properties' },
              { id: 'emulsions', name: 'Elementary ideas of emulsions' },
              { id: 'surfactants', name: 'Surfactants' },
              { id: 'micelles', name: 'Micelles' }
            ]
          }
        ]
      },
      {
        id: 'periodic-classification',
        name: 'Classification of Elements and Periodicity',
        topics: [
          {
            id: 'periodic-law',
            name: 'Periodic Law',
            subtopics: [
              { id: 'modern-periodic-law', name: 'Modern periodic law' },
              { id: 'periodic-table-form', name: 'Present form of periodic table' },
              { id: 'electronic-config', name: 'Electronic configuration of elements' }
            ]
          },
          {
            id: 'periodic-trends',
            name: 'Periodic Trends',
            subtopics: [
              { id: 'atomic-radius-trend', name: 'Periodic trends in atomic radius' },
              { id: 'ionic-radius-trend', name: 'Periodic trends in ionic radius' },
              { id: 'ionization-enthalpy', name: 'Ionization enthalpy trends' },
              { id: 'electron-gain-enthalpy', name: 'Electron gain enthalpy trends' },
              { id: 'valence-trends', name: 'Valence trends' },
              { id: 'oxidation-states', name: 'Oxidation states' },
              { id: 'electronegativity-trend', name: 'Electronegativity trends' },
              { id: 'chemical-reactivity', name: 'Chemical reactivity trends' }
            ]
          }
        ]
      },
      {
        id: 'hydrogen',
        name: 'Hydrogen',
        topics: [
          {
            id: 'hydrogen-position',
            name: 'Position and Occurrence',
            subtopics: [
              { id: 'periodic-position', name: 'Position of hydrogen in periodic table' },
              { id: 'occurrence', name: 'Occurrence of hydrogen' },
              { id: 'isotopes', name: 'Isotopes of hydrogen' }
            ]
          },
          {
            id: 'hydrogen-preparation',
            name: 'Preparation and Properties',
            subtopics: [
              { id: 'hydrogen-preparation', name: 'Preparation of hydrogen' },
              { id: 'hydrogen-properties', name: 'Properties and uses of hydrogen' },
              { id: 'hydrides', name: 'Hydrides – ionic, covalent and interstitial' }
            ]
          },
          {
            id: 'water-compounds',
            name: 'Water and Related Compounds',
            subtopics: [
              { id: 'water-properties', name: 'Physical and chemical properties of water' },
              { id: 'heavy-water', name: 'Heavy water' },
              { id: 'hydrogen-peroxide', name: 'Hydrogen peroxide preparation, reactions, structure' },
              { id: 'hydrogen-fuel', name: 'Hydrogen as a fuel' }
            ]
          }
        ]
      },
      {
        id: 's-block',
        name: 's-Block Elements',
        topics: [
          {
            id: 'alkali-metals',
            name: 'Alkali and Alkaline Earth Metals',
            subtopics: [
              { id: 'reactivity-air', name: 'Reactivity towards air' },
              { id: 'reactivity-water', name: 'Reactivity towards water' },
              { id: 'reactivity-dihydrogen', name: 'Reactivity towards dihydrogen' },
              { id: 'reactivity-halogens', name: 'Reactivity towards halogens' },
              { id: 'reactivity-acids', name: 'Reactivity towards acids' },
              { id: 'reducing-nature', name: 'Reducing nature including solutions in liquid ammonia' },
              { id: 'element-uses', name: 'Uses of these elements' }
            ]
          },
          {
            id: 'compounds-characteristics',
            name: 'Compounds and Characteristics',
            subtopics: [
              { id: 'oxides-characteristics', name: 'General characteristics of oxides' },
              { id: 'hydroxides-characteristics', name: 'General characteristics of hydroxides' },
              { id: 'halides-characteristics', name: 'General characteristics of halides' },
              { id: 'oxoacid-salts', name: 'Salts of oxoacids' },
              { id: 'anomalous-behaviour', name: 'Anomalous behaviour of lithium and beryllium' }
            ]
          },
          {
            id: 'specific-compounds',
            name: 'Specific Compounds',
            subtopics: [
              { id: 'sodium-carbonate', name: 'Sodium carbonate - preparation, properties, uses' },
              { id: 'sodium-chloride', name: 'Sodium chloride - preparation, properties, uses' },
              { id: 'sodium-hydroxide', name: 'Sodium hydroxide - preparation, properties, uses' },
              { id: 'sodium-bicarbonate', name: 'Sodium hydrogen carbonate - preparation, properties, uses' },
              { id: 'calcium-oxide', name: 'Calcium oxide - preparation, properties, uses' },
              { id: 'calcium-hydroxide', name: 'Calcium hydroxide - preparation, properties, uses' },
              { id: 'calcium-carbonate', name: 'Calcium carbonate - preparation, properties, uses' },
              { id: 'calcium-sulphate', name: 'Calcium sulphate - preparation, properties, uses' }
            ]
          }
        ]
      },
      {
        id: 'p-block',
        name: 'p-Block Elements',
        topics: [
          {
            id: 'general-trends',
            name: 'General Trends',
            subtopics: [
              { id: 'oxidation-state-trends', name: 'Oxidation state trends in groups 13-17' },
              { id: 'chemical-reactivity-trends', name: 'Chemical reactivity trends in groups 13-17' },
              { id: 'anomalous-properties', name: 'Anomalous properties of B, C, N, O, F' }
            ]
          },
          {
            id: 'group-13',
            name: 'Group 13',
            subtopics: [
              { id: 'group13-reactivity', name: 'Reactivity towards acids, alkalis, halogens' },
              { id: 'borax', name: 'Borax - preparation, properties, uses' },
              { id: 'orthoboric-acid', name: 'Orthoboric acid - preparation, properties, uses' },
              { id: 'diborane', name: 'Diborane - preparation, properties, uses' },
              { id: 'boron-trifluoride', name: 'Boron trifluoride - preparation, properties, uses' },
              { id: 'aluminium-chloride', name: 'Aluminium chloride - preparation, properties, uses' },
              { id: 'alums', name: 'Alums - preparation, properties, uses' },
              { id: 'boron-aluminium-uses', name: 'Uses of boron and aluminium' }
            ]
          },
          {
            id: 'group-14',
            name: 'Group 14',
            subtopics: [
              { id: 'group14-reactivity', name: 'Reactivity towards water and halogen' },
              { id: 'carbon-allotropes', name: 'Allotropes of carbon and uses' },
              { id: 'carbon-monoxide', name: 'Carbon monoxide - preparation, properties, uses' },
              { id: 'carbon-dioxide', name: 'Carbon dioxide - preparation, properties, uses' },
              { id: 'silicon-dioxide', name: 'Silicon dioxide - preparation, properties, uses' },
              { id: 'silicones', name: 'Silicones - preparation, properties, uses' },
              { id: 'silicates', name: 'Silicates - preparation, properties, uses' },
              { id: 'zeolites', name: 'Zeolites - preparation, properties, uses' }
            ]
          },
          {
            id: 'group-15',
            name: 'Group 15',
            subtopics: [
              { id: 'group15-reactivity', name: 'Reactivity towards hydrogen, oxygen, halogen' },
              { id: 'phosphorus-allotropes', name: 'Allotropes of phosphorous' },
              { id: 'dinitrogen', name: 'Dinitrogen - preparation, properties, uses' },
              { id: 'ammonia', name: 'Ammonia - preparation, properties, uses' },
              { id: 'nitric-acid', name: 'Nitric acid - preparation, properties, uses' },
              { id: 'phosphine', name: 'Phosphine - preparation, properties, uses' },
              { id: 'phosphorus-trichloride', name: 'Phosphorus trichloride - preparation, properties, uses' },
              { id: 'phosphorus-pentachloride', name: 'Phosphorus pentachloride - preparation, properties, uses' },
              { id: 'nitrogen-oxides', name: 'Oxides of nitrogen' },
              { id: 'phosphorus-oxoacids', name: 'Oxoacids of phosphorus' }
            ]
          },
          {
            id: 'group-16',
            name: 'Group 16',
            subtopics: [
              { id: 'group16-reactivity', name: 'Reactivity towards hydrogen, oxygen, halogen' },
              { id: 'simple-oxides', name: 'Simple oxides' },
              { id: 'sulfur-allotropes', name: 'Allotropes of sulfur' },
              { id: 'dioxygen', name: 'Dioxygen - preparation/manufacture, properties, uses' },
              { id: 'ozone', name: 'Ozone - preparation/manufacture, properties, uses' },
              { id: 'sulfur-dioxide', name: 'Sulfur dioxide - preparation/manufacture, properties, uses' },
              { id: 'sulfuric-acid', name: 'Sulfuric acid - preparation/manufacture, properties, uses' },
              { id: 'sulfur-oxoacids', name: 'Oxoacids of sulfur' }
            ]
          },
          {
            id: 'group-17',
            name: 'Group 17',
            subtopics: [
              { id: 'group17-reactivity', name: 'Reactivity towards hydrogen, oxygen, metals' },
              { id: 'chlorine', name: 'Chlorine - preparation/manufacture, properties, uses' },
              { id: 'hydrogen-chloride', name: 'Hydrogen chloride - preparation/manufacture, properties, uses' },
              { id: 'interhalogen-compounds', name: 'Interhalogen compounds' },
              { id: 'halogen-oxoacids', name: 'Oxoacids of halogens' },
              { id: 'bleaching-powder', name: 'Bleaching powder' }
            ]
          },
          {
            id: 'group-18',
            name: 'Group 18',
            subtopics: [
              { id: 'noble-gas-properties', name: 'Chemical properties and uses' },
              { id: 'xenon-compounds', name: 'Compounds of xenon with fluorine and oxygen' }
            ]
          }
        ]
      },
      {
        id: 'd-block',
        name: 'd-Block Elements',
        topics: [
          {
            id: 'transition-elements',
            name: 'Transition Elements',
            subtopics: [
              { id: 'oxidation-states-stability', name: 'Oxidation states and stability' },
              { id: 'standard-electrode-potentials', name: 'Standard electrode potentials' },
              { id: 'interstitial-compounds', name: 'Interstitial compounds' },
              { id: 'alloys', name: 'Alloys' },
              { id: 'catalytic-properties', name: 'Catalytic properties' },
              { id: 'applications', name: 'Applications' }
            ]
          },
          {
            id: 'specific-elements',
            name: 'Specific Elements',
            subtopics: [
              { id: 'chromium-oxoanions', name: 'Preparation, structure, reactions of chromium oxoanions' },
              { id: 'manganese-oxoanions', name: 'Preparation, structure, reactions of manganese oxoanions' }
            ]
          }
        ]
      },
      {
        id: 'f-block',
        name: 'f-Block Elements',
        topics: [
          {
            id: 'lanthanoids-actinoids',
            name: 'Lanthanoids and Actinoids',
            subtopics: [
              { id: 'lanthanoid-contraction', name: 'Lanthanoid contraction' },
              { id: 'actinoid-contraction', name: 'Actinoid contraction' },
              { id: 'f-block-oxidation', name: 'Oxidation states' },
              { id: 'f-block-characteristics', name: 'General characteristics' }
            ]
          }
        ]
      },
      {
        id: 'coordination-compounds',
        name: 'Coordination Compounds',
        topics: [
          {
            id: 'werner-theory',
            name: "Werner's Theory",
            subtopics: [
              { id: 'werner-theory-concepts', name: "Werner's theory concepts" },
              { id: 'nomenclature', name: 'Nomenclature' },
              { id: 'isomerism', name: 'Cis-trans and ionization isomerism' }
            ]
          },
          {
            id: 'structure-bonding',
            name: 'Structure and Bonding',
            subtopics: [
              { id: 'hybridization-geometry', name: 'Hybridization and geometries' },
              { id: 'linear-geometry', name: 'Linear geometry' },
              { id: 'tetrahedral-geometry', name: 'Tetrahedral geometry' },
              { id: 'square-planar-geometry', name: 'Square planar geometry' },
              { id: 'octahedral-geometry', name: 'Octahedral geometry' },
              { id: 'vbt-bonding', name: 'Bonding (VBT)' },
              { id: 'cft-bonding', name: 'Crystal Field Theory (octahedral and tetrahedral)' }
            ]
          },
          {
            id: 'properties',
            name: 'Properties',
            subtopics: [
              { id: 'magnetic-properties', name: 'Magnetic properties (spin-only)' },
              { id: 'color-properties', name: 'Color of 3d-series coordination compounds' },
              { id: 'ligands', name: 'Ligands and spectrochemical series' },
              { id: 'stability', name: 'Stability' },
              { id: 'importance-applications', name: 'Importance and applications' },
              { id: 'metal-carbonyls', name: 'Metal carbonyls' }
            ]
          }
        ]
      },
      {
        id: 'isolation-metals',
        name: 'Isolation of Metals',
        topics: [
          {
            id: 'metal-ores',
            name: 'Metal Ores',
            subtopics: [
              { id: 'ore-concentration', name: 'Metal ores and their concentration' }
            ]
          },
          {
            id: 'extraction-methods',
            name: 'Extraction Methods',
            subtopics: [
              { id: 'thermodynamic-principles', name: 'Thermodynamic principles (iron, copper, zinc)' },
              { id: 'electrochemical-principles', name: 'Electrochemical principles (aluminium)' },
              { id: 'cyanide-process', name: 'Cyanide process (silver and gold)' },
              { id: 'refining', name: 'Refining' }
            ]
          }
        ]
      },
      {
        id: 'qualitative-analysis',
        name: 'Principles of Qualitative Analysis',
        topics: [
          {
            id: 'cation-analysis',
            name: 'Cation Analysis',
            subtopics: [
              { id: 'group1-cations', name: 'Group I cations (Ag+, Hg2+)' },
              { id: 'group2-cations', name: 'Group II cations (Cu2+, Pb2+)' },
              { id: 'group3-cations', name: 'Group III cations (Fe3+, Cr3+, Al3+)' },
              { id: 'group4-cations', name: 'Group IV cations (Ca2+, Ba2+)' },
              { id: 'group5-cations', name: 'Group V cations (Zn2+, Mn2+, Mg2+)' }
            ]
          },
          {
            id: 'anion-analysis',
            name: 'Anion Analysis',
            subtopics: [
              { id: 'nitrate', name: 'Nitrate' },
              { id: 'halides', name: 'Halides (excluding fluoride)' },
              { id: 'carbonate-bicarbonate', name: 'Carbonate and bicarbonate' },
              { id: 'sulphate-sulphide', name: 'Sulphate and sulphide' }
            ]
          }
        ]
      },
      {
        id: 'environmental-chemistry',
        name: 'Environmental Chemistry',
        topics: [
          {
            id: 'pollution-types',
            name: 'Types of Pollution',
            subtopics: [
              { id: 'atmospheric-pollution', name: 'Atmospheric pollution' },
              { id: 'water-pollution', name: 'Water pollution' },
              { id: 'soil-pollution', name: 'Soil pollution' },
              { id: 'industrial-waste', name: 'Industrial waste' }
            ]
          },
          {
            id: 'pollution-control',
            name: 'Pollution Control',
            subtopics: [
              { id: 'control-strategies', name: 'Strategies to control environmental pollution' },
              { id: 'green-chemistry', name: 'Green chemistry' }
            ]
          }
        ]
      },
      {
        id: 'organic-principles',
        name: 'Basic Principles of Organic Chemistry',
        topics: [
          {
            id: 'carbon-bonding',
            name: 'Carbon Bonding',
            subtopics: [
              { id: 'carbon-hybridisation', name: 'Hybridisation of carbon' },
              { id: 'sigma-pi-bonds', name: 'σ and π-bonds' },
              { id: 'organic-shapes', name: 'Shapes of simple organic molecules' },
              { id: 'aromaticity', name: 'Aromaticity' }
            ]
          },
          {
            id: 'isomerism-organic',
            name: 'Isomerism',
            subtopics: [
              { id: 'structural-isomerism', name: 'Structural isomerism' },
              { id: 'geometrical-isomerism', name: 'Geometrical isomerism' },
              { id: 'stereoisomers', name: 'Stereoisomers and relationships' },
              { id: 'enantiomers', name: 'Enantiomers' },
              { id: 'diastereomers', name: 'Diastereomers' },
              { id: 'meso-compounds', name: 'Meso compounds' }
            ]
          },
          {
            id: 'formula-determination',
            name: 'Formula Determination',
            subtopics: [
              { id: 'empirical-formula', name: 'Determination of empirical formula' },
              { id: 'molecular-formula', name: 'Determination of molecular formula' },
              { id: 'combustion-method', name: 'Combustion method only' }
            ]
          },
          {
            id: 'nomenclature',
            name: 'IUPAC Nomenclature',
            subtopics: [
              { id: 'hydrocarbon-nomenclature', name: 'Hydrocarbons nomenclature' },
              { id: 'cyclic-hydrocarbons', name: 'Simple cyclic hydrocarbons' },
              { id: 'functional-derivatives', name: 'Mono-functional and bi-functional derivatives' }
            ]
          },
          {
            id: 'electronic-effects',
            name: 'Electronic Effects',
            subtopics: [
              { id: 'hydrogen-bonding-organic', name: 'Hydrogen bonding effects' },
              { id: 'inductive-effect', name: 'Inductive effect' },
              { id: 'resonance-effect', name: 'Resonance effect' },
              { id: 'hyperconjugation', name: 'Hyperconjugative effects' },
              { id: 'acidity-basicity', name: 'Acidity and basicity of organic compounds' }
            ]
          },
          {
            id: 'reactive-intermediates',
            name: 'Reactive Intermediates',
            subtopics: [
              { id: 'bond-cleavage', name: 'Homolytic and heterolytic bond cleavage' },
              { id: 'carbocations', name: 'Formation, structure and stability of carbocations' },
              { id: 'carbanions', name: 'Formation, structure and stability of carbanions' },
              { id: 'free-radicals', name: 'Formation, structure and stability of free radicals' }
            ]
          }
        ]
      },
      {
        id: 'alkanes',
        name: 'Alkanes',
        topics: [
          {
            id: 'alkane-properties',
            name: 'Properties',
            subtopics: [
              { id: 'homologous-series', name: 'Homologous series' },
              { id: 'physical-properties-alkanes', name: 'Physical properties (melting, boiling points, density)' },
              { id: 'branching-effect', name: 'Effect of branching on properties' }
            ]
          },
          {
            id: 'alkane-structure',
            name: 'Structure',
            subtopics: [
              { id: 'ethane-conformation', name: 'Conformations of ethane (Newman projections)' },
              { id: 'butane-conformation', name: 'Conformations of butane (Newman projections)' }
            ]
          },
          {
            id: 'alkane-preparation',
            name: 'Preparation',
            subtopics: [
              { id: 'from-alkyl-halides', name: 'Preparation from alkyl halides' },
              { id: 'from-carboxylic-acids', name: 'Preparation from aliphatic carboxylic acids' }
            ]
          },
          {
            id: 'alkane-reactions',
            name: 'Reactions',
            subtopics: [
              { id: 'combustion', name: 'Combustion' },
              { id: 'halogenation-alkanes', name: 'Halogenation (including allylic and benzylic)' },
              { id: 'oxidation-alkanes', name: 'Oxidation' }
            ]
          }
        ]
      },
      {
        id: 'alkenes-alkynes',
        name: 'Alkenes and Alkynes',
        topics: [
          {
            id: 'alkene-alkyne-properties',
            name: 'Properties',
            subtopics: [
              { id: 'physical-properties-alkenes', name: 'Physical properties (boiling points, density, dipole moments)' }
            ]
          },
          {
            id: 'alkene-alkyne-preparation',
            name: 'Preparation',
            subtopics: [
              { id: 'elimination-reactions', name: 'Preparation by elimination reactions' },
              { id: 'acid-catalysed-hydration', name: 'Acid catalysed hydration' },
              { id: 'metal-acetylides', name: 'Metal acetylides' }
            ]
          },
          {
            id: 'alkene-alkyne-reactions',
            name: 'Reactions',
            subtopics: [
              { id: 'kmno4-reactions', name: 'Reactions with KMnO4' },
              { id: 'ozone-reactions', name: 'Reactions with ozone' },
              { id: 'reduction-alkenes', name: 'Reduction of alkenes and alkynes' },
              { id: 'electrophilic-addition', name: 'Electrophilic addition reactions' },
              { id: 'addition-x2', name: 'Addition with X2' },
              { id: 'addition-hx', name: 'Addition with HX' },
              { id: 'addition-hox', name: 'Addition with HOX' },
              { id: 'peroxide-effect', name: 'Effect of peroxide on addition reactions' },
              { id: 'cyclic-polymerization', name: 'Cyclic polymerization reaction of alkynes' }
            ]
          }
        ]
      },
      {
        id: 'benzene',
        name: 'Benzene',
        topics: [
          {
            id: 'benzene-structure',
            name: 'Structure',
            subtopics: [
              { id: 'benzene-structure-theory', name: 'Structure of benzene' }
            ]
          },
          {
            id: 'electrophilic-substitution',
            name: 'Electrophilic Substitution',
            subtopics: [
              { id: 'halogenation-benzene', name: 'Halogenation' },
              { id: 'nitration-benzene', name: 'Nitration' },
              { id: 'sulphonation-benzene', name: 'Sulphonation' },
              { id: 'friedel-crafts-alkylation', name: 'Friedel-Crafts alkylation' },
              { id: 'friedel-crafts-acylation', name: 'Friedel-Crafts acylation' },
              { id: 'directing-groups', name: 'Effect of directing groups in monosubstituted benzene' }
            ]
          }
        ]
      },
      {
        id: 'phenols',
        name: 'Phenols',
        topics: [
          {
            id: 'phenol-properties',
            name: 'Properties',
            subtopics: [
              { id: 'physical-properties-phenol', name: 'Physical properties' }
            ]
          },
          {
            id: 'phenol-preparation',
            name: 'Preparation',
            subtopics: [
              { id: 'phenol-preparation-methods', name: 'Preparation methods' }
            ]
          },
          {
            id: 'phenol-reactions',
            name: 'Reactions',
            subtopics: [
              { id: 'electrophilic-substitution-phenol', name: 'Electrophilic substitution reactions' },
              { id: 'halogenation-phenol', name: 'Halogenation' },
              { id: 'nitration-phenol', name: 'Nitration' },
              { id: 'sulphonation-phenol', name: 'Sulphonation' },
              { id: 'reimer-tiemann', name: 'Reimer-Tiemann reaction' },
              { id: 'kolbe-reaction', name: 'Kolbe reaction' },
              { id: 'esterification-phenol', name: 'Esterification' },
              { id: 'etherification', name: 'Etherification' },
              { id: 'aspirin-synthesis', name: 'Aspirin synthesis' },
              { id: 'oxidation-reduction-phenol', name: 'Oxidation and reduction reactions' }
            ]
          }
        ]
      },
      {
        id: 'alkyl-halides',
        name: 'Alkyl Halides',
        topics: [
          {
            id: 'alkyl-halide-reactions',
            name: 'Reactions',
            subtopics: [
              { id: 'rearrangement-reactions', name: 'Rearrangement reactions of alkyl carbocation' },
              { id: 'grignard-reactions', name: 'Grignard reactions' },
              { id: 'nucleophilic-substitution', name: 'Nucleophilic substitution reactions' },
              { id: 'stereochemical-aspects', name: 'Stereochemical aspects' }
            ]
          }
        ]
      },
      {
        id: 'alcohols',
        name: 'Alcohols',
        topics: [
          {
            id: 'alcohol-properties',
            name: 'Properties',
            subtopics: [
              { id: 'physical-properties-alcohol', name: 'Physical properties' }
            ]
          },
          {
            id: 'alcohol-reactions',
            name: 'Reactions',
            subtopics: [
              { id: 'esterification-alcohol', name: 'Esterification' },
              { id: 'dehydration-alcohol', name: 'Dehydration (formation of alkenes and ethers)' },
              { id: 'sodium-reaction', name: 'Reactions with sodium' },
              { id: 'phosphorus-halides', name: 'Reactions with phosphorus halides' },
              { id: 'zncl2-hcl', name: 'Reactions with ZnCl2/concentrated HCl' },
              { id: 'thionyl-chloride', name: 'Reactions with thionyl chloride' },
              { id: 'alcohol-conversion', name: 'Conversion into aldehydes, ketones and carboxylic acids' }
            ]
          }
        ]
      },
      {
        id: 'ethers',
        name: 'Ethers',
        topics: [
          {
            id: 'ether-preparation',
            name: 'Preparation',
            subtopics: [
              { id: 'williamson-synthesis', name: "Preparation by Williamson's synthesis" }
            ]
          },
          {
            id: 'ether-reactions',
            name: 'Reactions',
            subtopics: [
              { id: 'co-bond-cleavage', name: 'C-O bond cleavage reactions' }
            ]
          }
        ]
      },
      {
        id: 'aldehydes-ketones',
        name: 'Aldehydes and Ketones',
        topics: [
          {
            id: 'carbonyl-preparation',
            name: 'Preparation',
            subtopics: [
              { id: 'from-acid-chlorides', name: 'From acid chlorides and nitriles' },
              { id: 'aldehydes-from-esters', name: 'Aldehydes from esters' },
              { id: 'benzaldehyde-preparation', name: 'Benzaldehyde from toluene and benzene' }
            ]
          },
          {
            id: 'carbonyl-reactions',
            name: 'Reactions',
            subtopics: [
              { id: 'oxidation-carbonyl', name: 'Oxidation' },
              { id: 'reduction-carbonyl', name: 'Reduction' },
              { id: 'oxime-formation', name: 'Oxime formation' },
              { id: 'hydrazone-formation', name: 'Hydrazone formation' },
              { id: 'aldol-condensation', name: 'Aldol condensation' },
              { id: 'cannizzaro-reaction', name: 'Cannizzaro reaction' },
              { id: 'haloform-reaction', name: 'Haloform reaction' },
              { id: 'nucleophilic-addition-carbonyl', name: 'Nucleophilic addition reactions' },
              { id: 'addition-rmgx', name: 'Addition with RMgX' },
              { id: 'addition-nahso3', name: 'Addition with NaHSO3' },
              { id: 'addition-hcn', name: 'Addition with HCN' },
              { id: 'addition-alcohol', name: 'Addition with alcohol' },
              { id: 'addition-amine', name: 'Addition with amine' }
            ]
          }
        ]
      },
      {
        id: 'carboxylic-acids',
        name: 'Carboxylic Acids',
        topics: [
          {
            id: 'carboxylic-properties',
            name: 'Properties',
            subtopics: [
              { id: 'physical-properties-carboxylic', name: 'Physical properties' }
            ]
          },
          {
            id: 'carboxylic-preparation',
            name: 'Preparation',
            subtopics: [
              { id: 'from-nitriles', name: 'From nitriles' },
              { id: 'from-grignard', name: 'From Grignard reagents' },
              { id: 'ester-hydrolysis', name: 'Hydrolysis of esters' },
              { id: 'amide-hydrolysis', name: 'Hydrolysis of amides' },
              { id: 'benzoic-preparation', name: 'Preparation of benzoic acid from alkylbenzenes' }
            ]
          },
          {
            id: 'carboxylic-reactions',
            name: 'Reactions',
            subtopics: [
              { id: 'reduction-carboxylic', name: 'Reduction' },
              { id: 'halogenation-carboxylic', name: 'Halogenation' },
              { id: 'ester-formation', name: 'Formation of esters' },
              { id: 'acid-chloride-formation', name: 'Formation of acid chlorides' },
              { id: 'amide-formation', name: 'Formation of amides' }
            ]
          }
        ]
      },
      {
        id: 'amines',
        name: 'Amines',
        topics: [
          {
            id: 'amine-preparation',
            name: 'Preparation',
            subtopics: [
              { id: 'from-nitro-compounds', name: 'From nitro compounds' },
              { id: 'from-nitriles-amines', name: 'From nitriles' },
              { id: 'from-amides', name: 'From amides' }
            ]
          },
          {
            id: 'amine-reactions',
            name: 'Reactions',
            subtopics: [
              { id: 'hoffmann-degradation', name: 'Hoffmann bromamide degradation' },
              { id: 'gabriel-synthesis', name: 'Gabriel phthalimide synthesis' },
              { id: 'nitrous-acid-reaction', name: 'Reaction with nitrous acid' },
              { id: 'azo-coupling', name: 'Azo coupling reaction of diazonium salts' },
              { id: 'sandmeyer-reaction', name: 'Sandmeyer and related reactions' },
              { id: 'carbylamine-reaction', name: 'Carbylamine reaction' },
              { id: 'hinsberg-test', name: 'Hinsberg test' },
              { id: 'alkylation-acylation', name: 'Alkylation and acylation reactions' }
            ]
          }
        ]
      },
      {
        id: 'haloarenes',
        name: 'Haloarenes',
        topics: [
          {
            id: 'haloarene-reactions',
            name: 'Reactions',
            subtopics: [
              { id: 'fittig-reaction', name: 'Fittig reaction' },
              { id: 'wurtz-fittig', name: 'Wurtz-Fittig reaction' },
              { id: 'nucleophilic-aromatic', name: 'Nucleophilic aromatic substitution' },
              { id: 'substituted-haloarenes', name: 'Nucleophilic substitution in substituted haloarenes' }
            ]
          }
        ]
      },
      {
        id: 'biomolecules',
        name: 'Biomolecules',
        topics: [
          {
            id: 'carbohydrates',
            name: 'Carbohydrates',
            subtopics: [
              { id: 'carbohydrate-classification', name: 'Classification' },
              { id: 'monosaccharides', name: 'Mono-saccharides (glucose)' },
              { id: 'disaccharides', name: 'Di-saccharides (sucrose)' },
              { id: 'oxidation-carbohydrates', name: 'Oxidation' },
              { id: 'reduction-carbohydrates', name: 'Reduction' },
              { id: 'glycoside-formation', name: 'Glycoside formation' },
              { id: 'disaccharide-hydrolysis', name: 'Hydrolysis of disaccharides' },
              { id: 'sucrose-hydrolysis', name: 'Sucrose hydrolysis' },
              { id: 'maltose-hydrolysis', name: 'Maltose hydrolysis' },
              { id: 'lactose-hydrolysis', name: 'Lactose hydrolysis' },
              { id: 'anomers', name: 'Anomers' }
            ]
          },
          {
            id: 'proteins',
            name: 'Proteins',
            subtopics: [
              { id: 'amino-acids', name: 'Amino acids' },
              { id: 'peptide-linkage', name: 'Peptide linkage' },
              { id: 'peptide-structure', name: 'Structure of peptides (primary and secondary)' },
              { id: 'protein-types', name: 'Types of proteins (fibrous and globular)' }
            ]
          },
          {
            id: 'nucleic-acids',
            name: 'Nucleic Acids',
            subtopics: [
              { id: 'dna-composition', name: 'Chemical composition and structure of DNA' },
              { id: 'rna-composition', name: 'Chemical composition and structure of RNA' }
            ]
          }
        ]
      },
      {
        id: 'polymers',
        name: 'Polymers',
        topics: [
          {
            id: 'polymerization-types',
            name: 'Types of Polymerization',
            subtopics: [
              { id: 'addition-polymerization', name: 'Addition polymerization' },
              { id: 'condensation-polymerization', name: 'Condensation polymerization' },
              { id: 'homo-copolymers', name: 'Homo and copolymers' }
            ]
          },
          {
            id: 'specific-polymers',
            name: 'Specific Polymers',
            subtopics: [
              { id: 'natural-rubber', name: 'Natural rubber' },
              { id: 'cellulose', name: 'Cellulose' },
              { id: 'nylon', name: 'Nylon' },
              { id: 'teflon', name: 'Teflon' },
              { id: 'bakelite', name: 'Bakelite' },
              { id: 'pvc', name: 'PVC' },
              { id: 'biodegradable-polymers', name: 'Bio-degradable polymers' },
              { id: 'polymer-applications', name: 'Applications of polymers' }
            ]
          }
        ]
      },
      {
        id: 'chemistry-everyday',
        name: 'Chemistry in Everyday Life',
        topics: [
          {
            id: 'drug-interaction',
            name: 'Drug-Target Interaction',
            subtopics: [
              { id: 'drug-target-theory', name: 'Drug-target interaction' },
              { id: 'therapeutic-action', name: 'Therapeutic action and examples' }
            ]
          },
          {
            id: 'drug-types',
            name: 'Types of Drugs',
            subtopics: [
              { id: 'antacids', name: 'Antacids' },
              { id: 'antihistamines', name: 'Antihistamines' },
              { id: 'tranquilizers', name: 'Tranquilizers' },
              { id: 'analgesics', name: 'Analgesics' },
              { id: 'antimicrobials', name: 'Antimicrobials' },
              { id: 'antifertility-drugs', name: 'Antifertility drugs' }
            ]
          },
          {
            id: 'other-substances',
            name: 'Other Chemical Substances',
            subtopics: [
              { id: 'artificial-sweeteners', name: 'Artificial sweeteners (names only)' },
              { id: 'soaps', name: 'Soaps' },
              { id: 'detergents', name: 'Detergents' },
              { id: 'cleansing-action', name: 'Cleansing action' }
            ]
          }
        ]
      },
      {
        id: 'practical-organic',
        name: 'Practical Organic Chemistry',
        topics: [
          {
            id: 'element-detection',
            name: 'Element Detection',
            subtopics: [
              { id: 'nitrogen-detection', name: 'Detection of nitrogen' },
              { id: 'sulfur-detection', name: 'Detection of sulfur' },
              { id: 'halogen-detection', name: 'Detection of halogens' }
            ]
          },
          {
            id: 'functional-group-detection',
            name: 'Functional Group Detection',
            subtopics: [
              { id: 'hydroxyl-detection', name: 'Hydroxyl (alcoholic and phenolic)' },
              { id: 'carbonyl-detection', name: 'Carbonyl (aldehyde and ketone)' },
              { id: 'carboxyl-detection', name: 'Carboxyl' },
              { id: 'amino-detection', name: 'Amino' },
              { id: 'nitro-detection', name: 'Nitro' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    className: 'subject-mathematics',
    chapters: [
      {
        id: 'sets-relations-functions',
        name: 'Sets, Relations and Functions',
        topics: [
          {
            id: 'sets',
            name: 'Sets',
            subtopics: [
              { id: 'set-representations', name: 'Sets and their representations' },
              { id: 'set-types', name: 'Different kinds of sets (empty, finite, infinite)' },
              { id: 'set-algebra', name: 'Algebra of sets' },
              { id: 'set-operations', name: 'Intersection, complement, difference, symmetric difference' },
              { id: 'set-properties', name: 'Algebraic properties of set operations' },
              { id: 'de-morgan-laws', name: "De-Morgan's laws on sets" },
              { id: 'practical-problems', name: 'Practical problems based on sets' }
            ]
          },
          {
            id: 'relations',
            name: 'Relations',
            subtopics: [
              { id: 'cartesian-product', name: 'Cartesian product of finite sets' },
              { id: 'ordered-pair', name: 'Ordered pair' },
              { id: 'relations-theory', name: 'Relations, domain and codomain' },
              { id: 'equivalence-relation', name: 'Equivalence relation' }
            ]
          },
          {
            id: 'functions',
            name: 'Functions',
            subtopics: [
              { id: 'function-relation', name: 'Function as special case of relation' },
              { id: 'function-mapping', name: 'Functions as mappings' },
              { id: 'domain-codomain-range', name: 'Domain, codomain, range of functions' },
              { id: 'invertible-functions', name: 'Invertible functions' },
              { id: 'even-odd-functions', name: 'Even and odd functions' },
              { id: 'into-onto-one-one', name: 'Into, onto and one-to-one functions' },
              { id: 'special-functions', name: 'Special functions (polynomial, trigonometric, exponential, logarithmic, power, absolute value, greatest integer, etc.)' },
              { id: 'function-operations', name: 'Sum, difference, product and composition of functions' }
            ]
          }
        ]
      },
      {
        id: 'algebra',
        name: 'Algebra',
        topics: [
          {
            id: 'complex-numbers',
            name: 'Complex Numbers',
            subtopics: [
              { id: 'complex-algebra', name: 'Algebra of complex numbers' },
              { id: 'complex-operations', name: 'Addition, multiplication, conjugation' },
              { id: 'polar-representation', name: 'Polar representation' },
              { id: 'modulus-argument', name: 'Properties of modulus and principal argument' },
              { id: 'triangle-inequality', name: 'Triangle inequality' },
              { id: 'cube-roots-unity', name: 'Cube roots of unity' },
              { id: 'geometric-interpretations', name: 'Geometric interpretations' }
            ]
          },
          {
            id: 'quadratic-equations',
            name: 'Quadratic Equations',
            subtopics: [
              { id: 'fundamental-theorem', name: 'Statement of fundamental theorem of algebra' },
              { id: 'quadratic-real-coefficients', name: 'Quadratic equations with real coefficients' },
              { id: 'roots-coefficients', name: 'Relations between roots and coefficients' },
              { id: 'quadratic-formation', name: 'Formation of quadratic equations with given roots' },
              { id: 'symmetric-functions', name: 'Symmetric functions of roots' }
            ]
          },
          {
            id: 'progressions',
            name: 'Progressions',
            subtopics: [
              { id: 'arithmetic-progression', name: 'Arithmetic progressions' },
              { id: 'geometric-progression', name: 'Geometric progressions' },
              { id: 'arithmetic-mean', name: 'Arithmetic means' },
              { id: 'geometric-mean', name: 'Geometric means' },
              { id: 'finite-ap-sum', name: 'Sums of finite arithmetic progressions' },
              { id: 'finite-gp-sum', name: 'Sums of finite geometric progressions' },
              { id: 'infinite-gp-sum', name: 'Infinite geometric series' },
              { id: 'natural-numbers-sum', name: 'Sum of first n natural numbers' },
              { id: 'squares-sum', name: 'Sums of squares of first n natural numbers' },
              { id: 'cubes-sum', name: 'Sums of cubes of first n natural numbers' }
            ]
          },
          {
            id: 'logarithms-combinatorics',
            name: 'Logarithms and Combinatorics',
            subtopics: [
              { id: 'logarithms-properties', name: 'Logarithms and their properties' },
              { id: 'permutations', name: 'Permutations' },
              { id: 'combinations', name: 'Combinations' },
              { id: 'binomial-theorem', name: 'Binomial theorem for positive integral index' },
              { id: 'binomial-coefficients', name: 'Properties of binomial coefficients' }
            ]
          }
        ]
      },
      {
        id: 'matrices',
        name: 'Matrices',
        topics: [
          {
            id: 'matrix-basics',
            name: 'Matrix Basics',
            subtopics: [
              { id: 'matrix-definition', name: 'Matrices as rectangular array of real numbers' },
              { id: 'matrix-equality', name: 'Equality of matrices' },
              { id: 'matrix-addition', name: 'Matrix addition' },
              { id: 'scalar-multiplication', name: 'Multiplication by scalar' },
              { id: 'matrix-product', name: 'Product of matrices' },
              { id: 'matrix-transpose', name: 'Transpose of matrix' }
            ]
          },
          {
            id: 'matrix-operations',
            name: 'Matrix Operations',
            subtopics: [
              { id: 'row-column-transformations', name: 'Elementary row and column transformations' },
              { id: 'determinant', name: 'Determinant of square matrix (up to order 3)' },
              { id: 'adjoint', name: 'Adjoint of matrix' },
              { id: 'matrix-inverse', name: 'Inverse of square matrix (up to order 3)' },
              { id: 'matrix-properties', name: 'Properties of matrix operations' }
            ]
          },
          {
            id: 'special-matrices',
            name: 'Special Matrices',
            subtopics: [
              { id: 'diagonal-matrix', name: 'Diagonal matrices and properties' },
              { id: 'symmetric-matrix', name: 'Symmetric matrices and properties' },
              { id: 'skew-symmetric-matrix', name: 'Skew-symmetric matrices and properties' }
            ]
          },
          {
            id: 'linear-equations',
            name: 'Linear Equations',
            subtopics: [
              { id: 'simultaneous-linear', name: 'Solutions of simultaneous linear equations' },
              { id: 'two-variables', name: 'Linear equations in two variables' },
              { id: 'three-variables', name: 'Linear equations in three variables' }
            ]
          }
        ]
      },
      {
        id: 'probability-statistics',
        name: 'Probability and Statistics',
        topics: [
          {
            id: 'probability-basics',
            name: 'Probability Basics',
            subtopics: [
              { id: 'random-experiment', name: 'Random experiment' },
              { id: 'sample-space', name: 'Sample space' },
              { id: 'event-types', name: 'Different types of events (impossible, simple, compound)' },
              { id: 'probability-rules', name: 'Addition and multiplication rules of probability' },
              { id: 'conditional-probability', name: 'Conditional probability' },
              { id: 'independence-events', name: 'Independence of events' },
              { id: 'total-probability', name: 'Total probability' },
              { id: 'bayes-theorem', name: 'Bayes Theorem' },
              { id: 'probability-computation', name: 'Computation using permutations and combinations' }
            ]
          },
          {
            id: 'statistics',
            name: 'Statistics',
            subtopics: [
              { id: 'central-tendency', name: 'Measure of central tendency and dispersion' },
              { id: 'mean-median-mode', name: 'Mean, median, mode' },
              { id: 'mean-deviation', name: 'Mean deviation' },
              { id: 'standard-deviation', name: 'Standard deviation and variance' },
              { id: 'grouped-ungrouped', name: 'Grouped and ungrouped data analysis' },
              { id: 'frequency-distribution', name: 'Analysis of frequency distribution with same mean but different variance' },
              { id: 'random-variable', name: 'Random variable' },
              { id: 'variable-mean-variance', name: 'Mean and variance of random variable' }
            ]
          }
        ]
      },
      {
        id: 'trigonometry',
        name: 'Trigonometry',
        topics: [
          {
            id: 'trigonometric-functions',
            name: 'Trigonometric Functions',
            subtopics: [
              { id: 'trig-functions', name: 'Trigonometric functions' },
              { id: 'periodicity', name: 'Periodicity of trigonometric functions' },
              { id: 'trig-graphs', name: 'Graphs of trigonometric functions' },
              { id: 'addition-subtraction', name: 'Addition and subtraction formulae' },
              { id: 'multiple-angles', name: 'Formulae involving multiple angles' },
              { id: 'sub-multiple-angles', name: 'Formulae involving sub-multiple angles' },
              { id: 'trig-equations', name: 'General solution of trigonometric equations' }
            ]
          },
          {
            id: 'inverse-trigonometric',
            name: 'Inverse Trigonometric Functions',
            subtopics: [
              { id: 'inverse-trig-functions', name: 'Inverse trigonometric functions (principal value only)' },
              { id: 'inverse-trig-properties', name: 'Elementary properties of inverse trigonometric functions' }
            ]
          }
        ]
      },
      {
        id: 'analytical-geometry',
        name: 'Analytical Geometry',
        topics: [
          {
            id: 'two-dimensions',
            name: 'Two Dimensions',
            subtopics: [
              { id: 'cartesian-coordinates', name: 'Cartesian coordinates' },
              { id: 'distance-formula', name: 'Distance between two points' },
              { id: 'section-formulae', name: 'Section formulae' },
              { id: 'origin-shift', name: 'Shift of origin' }
            ]
          },
          {
            id: 'straight-lines',
            name: 'Straight Lines',
            subtopics: [
              { id: 'line-equations', name: 'Equation of straight line in various forms' },
              { id: 'angle-lines', name: 'Angle between two lines' },
              { id: 'point-line-distance', name: 'Distance of point from line' },
              { id: 'intersection-lines', name: 'Lines through point of intersection of two given lines' },
              { id: 'angle-bisector', name: 'Equation of bisector of angle between two lines' },
              { id: 'concurrency', name: 'Concurrency of lines' }
            ]
          },
          {
            id: 'triangle-centers',
            name: 'Triangle Centers',
            subtopics: [
              { id: 'centroid', name: 'Centroid of triangle' },
              { id: 'orthocentre', name: 'Orthocentre of triangle' },
              { id: 'incentre', name: 'Incentre of triangle' },
              { id: 'circumcentre', name: 'Circumcentre of triangle' }
            ]
          },
          {
            id: 'circles',
            name: 'Circles',
            subtopics: [
              { id: 'circle-equations', name: 'Equation of circle in various forms' },
              { id: 'tangent-normal-chord', name: 'Equations of tangent, normal and chord' },
              { id: 'parametric-circle', name: 'Parametric equations of circle' },
              { id: 'circle-line-intersection', name: 'Intersection of circle with straight line' },
              { id: 'circle-circle-intersection', name: 'Intersection of two circles' },
              { id: 'circle-through-intersections', name: 'Circle through points of intersection' }
            ]
          },
          {
            id: 'conic-sections',
            name: 'Conic Sections',
            subtopics: [
              { id: 'parabola-equation', name: 'Equations of parabola in standard form' },
              { id: 'ellipse-equation', name: 'Equations of ellipse in standard form' },
              { id: 'hyperbola-equation', name: 'Equations of hyperbola in standard form' },
              { id: 'foci-directrices', name: 'Foci, directrices and eccentricity' },
              { id: 'parametric-equations', name: 'Parametric equations' },
              { id: 'conic-tangent-normal', name: 'Equations of tangent and normal' },
              { id: 'locus-problems', name: 'Locus problems' }
            ]
          }
        ]
      },
      {
        id: 'three-dimensions',
        name: 'Three Dimensions',
        topics: [
          {
            id: '3d-basics',
            name: '3D Geometry Basics',
            subtopics: [
              { id: '3d-distance', name: 'Distance between two points' },
              { id: 'direction-cosines', name: 'Direction cosines and direction ratios' }
            ]
          },
          {
            id: '3d-lines-planes',
            name: 'Lines and Planes in 3D',
            subtopics: [
              { id: 'line-equation-3d', name: 'Equation of straight line in space' },
              { id: 'skew-lines', name: 'Skew lines' },
              { id: 'shortest-distance', name: 'Shortest distance between two lines' },
              { id: 'plane-equation', name: 'Equation of plane' },
              { id: 'point-plane-distance', name: 'Distance of point from plane' }
            ]
          },
          {
            id: '3d-angles',
            name: 'Angles in 3D',
            subtopics: [
              { id: 'angle-two-lines', name: 'Angle between two lines' },
              { id: 'angle-two-planes', name: 'Angle between two planes' },
              { id: 'angle-line-plane', name: 'Angle between line and plane' },
              { id: 'coplanar-lines', name: 'Coplanar lines' }
            ]
          }
        ]
      },
      {
        id: 'differential-calculus',
        name: 'Differential Calculus',
        topics: [
          {
            id: 'limits-continuity',
            name: 'Limits and Continuity',
            subtopics: [
              { id: 'limit-function', name: 'Limit of function at real number' },
              { id: 'continuity-function', name: 'Continuity of function' },
              { id: 'limit-continuity-operations', name: 'Limit and continuity of sum, difference, product, quotient' },
              { id: 'lhospital-rule', name: "L'Hospital rule of evaluation of limits" },
              { id: 'composite-continuity', name: 'Continuity of composite functions' },
              { id: 'intermediate-value', name: 'Intermediate value property of continuous functions' }
            ]
          },
          {
            id: 'derivatives',
            name: 'Derivatives',
            subtopics: [
              { id: 'derivative-definition', name: 'Derivative of function' },
              { id: 'derivative-operations', name: 'Derivative of sum, difference, product, quotient' },
              { id: 'chain-rule', name: 'Chain rule' },
              { id: 'standard-derivatives', name: 'Derivatives of polynomial, rational, trigonometric, inverse trigonometric, exponential, logarithmic functions' }
            ]
          },
          {
            id: 'applications-derivatives',
            name: 'Applications of Derivatives',
            subtopics: [
              { id: 'tangents-normals', name: 'Tangents and normals' },
              { id: 'increasing-decreasing', name: 'Increasing and decreasing functions' },
              { id: 'second-derivatives', name: 'Derivatives of order two' },
              { id: 'maxima-minima', name: 'Maximum and minimum values of function' },
              { id: 'rolle-theorem', name: "Rolle's theorem" },
              { id: 'lagrange-theorem', name: "Lagrange's mean value theorem" },
              { id: 'geometric-interpretation', name: 'Geometric interpretation of theorems' },
              { id: 'implicit-derivatives', name: 'Derivatives of implicit functions (up to order two)' },
              { id: 'geometric-meaning', name: 'Geometric interpretation of derivatives' }
            ]
          }
        ]
      },
      {
        id: 'integral-calculus',
        name: 'Integral Calculus',
        topics: [
          {
            id: 'integration-basics',
            name: 'Integration Basics',
            subtopics: [
              { id: 'integration-inverse', name: 'Integration as inverse process of differentiation' },
              { id: 'indefinite-integrals', name: 'Indefinite integrals of standard functions' },
              { id: 'definite-integrals', name: 'Definite integrals as limit of sums' },
              { id: 'definite-properties', name: 'Definite integral properties' },
              { id: 'fundamental-theorem', name: 'Fundamental theorem of integral calculus' }
            ]
          },
          {
            id: 'integration-methods',
            name: 'Integration Methods',
            subtopics: [
              { id: 'integration-parts', name: 'Integration by parts' },
              { id: 'substitution-method', name: 'Integration by substitution method' },
              { id: 'partial-fractions', name: 'Integration by partial fractions' }
            ]
          },
          {
            id: 'applications-integration',
            name: 'Applications of Integration',
            subtopics: [
              { id: 'area-determination', name: 'Application to determination of areas bounded by simple curves' }
            ]
          },
          {
            id: 'differential-equations',
            name: 'Differential Equations',
            subtopics: [
              { id: 'ode-formation', name: 'Formation of ordinary differential equations' },
              { id: 'homogeneous-ode', name: 'Solution of homogeneous differential equations of first order and first degree' },
              { id: 'separation-variables', name: 'Separation of variables method' },
              { id: 'linear-first-order', name: 'Linear first order differential equations' }
            ]
          }
        ]
      },
      {
        id: 'vectors',
        name: 'Vectors',
        topics: [
          {
            id: 'vector-operations',
            name: 'Vector Operations',
            subtopics: [
              { id: 'vector-addition', name: 'Addition of vectors' },
              { id: 'scalar-multiplication-vectors', name: 'Scalar multiplication' },
              { id: 'dot-product', name: 'Dot product' },
              { id: 'cross-product', name: 'Cross product' },
              { id: 'scalar-triple-product', name: 'Scalar triple product' },
              { id: 'vector-triple-product', name: 'Vector triple product' },
              { id: 'geometric-interpretations', name: 'Geometrical interpretations' }
            ]
          }
        ]
      }
    ]
  }
];

const Index = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleItemCheck = (itemId: string, isChecked: boolean) => {
    const newCheckedItems = new Set(checkedItems);
    if (isChecked) {
      newCheckedItems.add(itemId);
    } else {
      newCheckedItems.delete(itemId);
    }
    setCheckedItems(newCheckedItems);
  };

  const handleChapterCheck = (chapter: Chapter, isChecked: boolean) => {
    const newCheckedItems = new Set(checkedItems);
    
    if (isChecked) {
      newCheckedItems.add(chapter.id);
      chapter.topics.forEach(topic => {
        newCheckedItems.add(topic.id);
        topic.subtopics?.forEach(subtopic => {
          newCheckedItems.add(subtopic.id);
        });
      });
    } else {
      newCheckedItems.delete(chapter.id);
      chapter.topics.forEach(topic => {
        newCheckedItems.delete(topic.id);
        topic.subtopics?.forEach(subtopic => {
          newCheckedItems.delete(subtopic.id);
        });
      });
    }
    
    setCheckedItems(newCheckedItems);
  };

  const isChapterChecked = (chapter: Chapter) => {
    return checkedItems.has(chapter.id);
  };

  const isTopicPartiallyChecked = (topic: Topic) => {
    if (!topic.subtopics) return false;
    const checkedSubtopics = topic.subtopics.filter(st => checkedItems.has(st.id));
    return checkedSubtopics.length > 0 && checkedSubtopics.length < topic.subtopics.length;
  };

  const isTopicFullyChecked = (topic: Topic) => {
    if (!topic.subtopics) return checkedItems.has(topic.id);
    return topic.subtopics.every(st => checkedItems.has(st.id));
  };

  const copyCheckedTopics = () => {
    const checkedTopics: string[] = [];
    
    syllabusData.forEach(subject => {
      let subjectHasChecked = false;
      const subjectTopics: string[] = [];
      
      subject.chapters.forEach(chapter => {
        let chapterHasChecked = false;
        const chapterTopics: string[] = [];
        
        chapter.topics.forEach(topic => {
          if (topic.subtopics) {
            const checkedSubtopics = topic.subtopics.filter(st => checkedItems.has(st.id));
            if (checkedSubtopics.length > 0) {
              chapterHasChecked = true;
              chapterTopics.push(`${topic.name}:`);
              checkedSubtopics.forEach(st => {
                chapterTopics.push(`  - ${st.name}`);
              });
            }
          } else if (checkedItems.has(topic.id)) {
            chapterHasChecked = true;
            chapterTopics.push(`- ${topic.name}`);
          }
        });
        
        if (chapterHasChecked) {
          subjectHasChecked = true;
          subjectTopics.push(`\n${chapter.name.toUpperCase()}`);
          subjectTopics.push(...chapterTopics);
        }
      });
      
      if (subjectHasChecked) {
        checkedTopics.push(`\n${subject.name.toUpperCase()}`);
        checkedTopics.push(...subjectTopics);
      }
    });
    
    const result = `JEE ADVANCED 2025 - CHECKED TOPICS\n${checkedTopics.join('\n')}`;
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied to clipboard!",
      description: `${checkedItems.size} topics copied successfully.`,
    });
  };

  const filteredData = useMemo(() => {
    let data = syllabusData;
    
    if (selectedSubject !== 'all') {
      data = data.filter(subject => subject.id === selectedSubject);
    }
    
    if (searchTerm) {
      data = data.map(subject => ({
        ...subject,
        chapters: subject.chapters.map(chapter => ({
          ...chapter,
          topics: chapter.topics.filter(topic => 
            topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            topic.subtopics?.some(st => st.name.toLowerCase().includes(searchTerm.toLowerCase()))
          )
        })).filter(chapter => chapter.topics.length > 0)
      })).filter(subject => subject.chapters.length > 0);
    }
    
    // Sort chapters
    data = data.map(subject => ({
      ...subject,
      chapters: [...subject.chapters].sort((a, b) => 
        sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      )
    }));
    
    return data;
  }, [selectedSubject, searchTerm, sortOrder]);

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 text-center">
        <h1 className="text-4xl font-bold mb-2 text-white">
          JEE Advanced 2025 Syllabus Checklist
        </h1>
        <p className="text-white/80 text-lg">
          Track your preparation progress across Physics, Chemistry, and Mathematics
        </p>
      </div>

      {/* Controls */}
      <div className="glass-card p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-white/60" />
            <Input
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/60"
            />
          </div>
          
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/30 text-white">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="mathematics">Mathematics</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            <SortAsc className={`h-4 w-4 mr-2 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
            Sort
          </Button>
          
          <Button
            onClick={copyCheckedTopics}
            disabled={checkedItems.size === 0}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Checked ({checkedItems.size})
          </Button>
        </div>
      </div>

      {/* Subjects */}
      <div className="space-y-6">
        {filteredData.map((subject) => (
          <Card key={subject.id} className={`glass-card border-2 ${subject.className}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-white">
                <BookOpen className="h-6 w-6" />
                {subject.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {subject.chapters.map((chapter) => (
                <div key={chapter.id} className="glass-card p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="checkbox-custom"
                      checked={isChapterChecked(chapter)}
                      onChange={(e) => handleChapterCheck(chapter, e.target.checked)}
                    />
                    <h3 className="font-semibold text-lg text-white">{chapter.name}</h3>
                  </div>
                  
                  <div className="ml-8 space-y-3">
                    {chapter.topics.map((topic) => (
                      <div key={topic.id} className="space-y-2">
                        <div className="flex items-center gap-3">
                          {topic.subtopics ? (
                            <div className="relative">
                              <input
                                type="checkbox"
                                className="checkbox-custom"
                                checked={isTopicFullyChecked(topic)}
                                onChange={(e) => {
                                  const newCheckedItems = new Set(checkedItems);
                                  if (e.target.checked) {
                                    topic.subtopics?.forEach(st => newCheckedItems.add(st.id));
                                  } else {
                                    topic.subtopics?.forEach(st => newCheckedItems.delete(st.id));
                                  }
                                  setCheckedItems(newCheckedItems);
                                }}
                              />
                              {isTopicPartiallyChecked(topic) && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white/60 rounded-sm"></div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <input
                              type="checkbox"
                              className="checkbox-custom"
                              checked={checkedItems.has(topic.id)}
                              onChange={(e) => handleItemCheck(topic.id, e.target.checked)}
                            />
                          )}
                          <span className="text-white/90 font-medium">{topic.name}</span>
                        </div>
                        
                        {topic.subtopics && (
                          <div className="ml-8 space-y-2">
                            {topic.subtopics.map((subtopic) => (
                              <div key={subtopic.id} className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  className="checkbox-custom"
                                  checked={checkedItems.has(subtopic.id)}
                                  onChange={(e) => handleItemCheck(subtopic.id, e.target.checked)}
                                />
                                <span className="text-white/80 text-sm">{subtopic.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;