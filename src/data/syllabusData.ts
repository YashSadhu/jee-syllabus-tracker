import { SyllabusData } from '@/types/syllabus';

export const syllabusData: SyllabusData = {
  "mathematics": {
    "Core Topics": {
      "Linear Algebra": [
        "Vector space",
        "Basis",
        "Linear dependence and independence",
        "Matrix algebra",
        "Eigenvalues and eigenvectors",
        "Rank",
        "Solution of linear equations",
        "Existence and uniqueness"
      ],
      "Calculus": [
        "Mean value theorems",
        "Theorems of integral calculus",
        "Evaluation of definite and improper integrals",
        "Partial derivatives",
        "Maxima and minima",
        "Multiple integrals",
        "Line integral",
        "Surface integral",
        "Volume integral",
        "Stokes theorem",
        "Gauss theorem",
        "Green's theorem"
      ],
      "Differential Equations": [
        "First order equations (linear and nonlinear)",
        "Higher order linear differential equations with constant coefficients",
        "Cauchy's equation",
        "Euler's equation",
        "Initial and boundary value problems",
        "Laplace transforms",
        "Solutions of heat, wave and Laplace's equations"
      ],
      "Complex Analysis": [
        "Analytic functions",
        "Cauchy's integral theorem",
        "Cauchy's integral formula",
        "Taylor series",
        "Laurent series",
        "Residue theorem",
        "Solution integrals"
      ],
      "Probability and Statistics": [
        "Definitions of probability and sampling theorems",
        "Conditional probability",
        "Mean, median, mode and standard deviation",
        "Random variables",
        "Discrete and continuous distributions",
        "Poisson distribution",
        "Normal distribution",
        "Binomial distribution",
        "Correlation analysis",
        "Regression analysis"
      ],
      "Numerical Methods": [
        "Solutions of nonlinear algebraic equations",
        "Single and multi-step methods for differential equations",
        "Convergence criteria"
      ],
      "Transform Theory": [
        "Fourier transform",
        "Laplace transform",
        "Z-transform"
      ]
    }
  },
  "Networks, Signals and Systems": {
    "Network Theory": {
      "Circuit Analysis": [
        "Voltage and current sources",
        "Independent sources",
        "Dependent sources",
        "Resistive networks",
        "Solution methods: nodal analysis",
        "Solution methods: mesh analysis",
        "Superposition theorem",
        "Thevenin's theorem",
        "Norton's theorem",
        "Maximum power transfer theorem"
      ],
      "AC Analysis": [
        "Steady state sinusoidal analysis using phasors",
        "Single phase AC circuits",
        "Power and power factor",
        "Three phase circuits",
        "Resonance in RLC circuits",
        "Locus diagrams"
      ],
      "Transient Analysis": [
        "Time domain analysis of simple linear circuits",
        "Solution of network equations using Laplace transform",
        "Frequency domain analysis",
        "2-port network parameters",
        "Driving point impedance and admittance",
        "Transfer functions"
      ],
      "Network Synthesis": [
        "Foster and Cauer forms of LC",
        "Foster and Cauer forms of RC and RL networks",
        "Transmission criteria: delay and rise time",
        "Group delay",
        "Phase delay"
      ]
    },
    "Signals and Systems": {
      "Signal Classification": [
        "Continuous and discrete signals",
        "Impulse response",
        "Step response",
        "Causality",
        "Stability",
        "Convolution",
        "Correlation of signals"
      ],
      "Fourier Analysis": [
        "Fourier series representation of continuous periodic signals",
        "Sampling theorem",
        "Applications of Fourier Transform",
        "Laplace transform",
        "Z-transform"
      ],
      "System Analysis": [
        "Linear Time-Invariant (LTI) systems",
        "Transmission of signals through LTI systems",
        "Discrete time signals and systems",
        "DFT and FFT",
        "2-D signals and systems"
      ]
    }
  },
  "Electronic Devices": {
    "Semiconductor Physics": {
      "Basic Concepts": [
        "Energy bands in intrinsic and extrinsic silicon",
        "Carrier transport: diffusion current",
        "Carrier transport: drift current",
        "Mobility and resistivity",
        "Generation and recombination of carriers",
        "Poisson equation",
        "Continuity equation"
      ],
      "P-N Junction": [
        "P-N junction, Zener diode",
        "Tunnel diode",
        "PIN diode",
        "Schottky diode",
        "Varactor diode",
        "Solar cell",
        "Photodiode"
      ]
    },
    "Bipolar Junction Transistors": {
      "BJT Fundamentals": [
        "Current-voltage characteristics",
        "Charge control model",
        "Small signal equivalent circuits",
        "Common emitter amplifier",
        "Common base amplifier",
        "Common collector amplifier",
        "Frequency response",
        "Current mirrors",
        "Differential amplifiers"
      ]
    },
    "Field Effect Transistors": {
      "MOSFET": [
        "C-V characteristics",
        "MOSFET capacitances",
        "Long channel I-V characteristics",
        "Constant field scaling",
        "CMOS inverter"
      ],
      "JFET": [
        "JFET characteristics",
        "JFET small signal equivalent circuits"
      ]
    },
    "Operational Amplifiers": {
      "Op-Amp Circuits": [
        "Ideal op-amp characteristics",
        "Inverting amplifier",
        "Non-inverting amplifier",
        "Summing amplifier",
        "Integrator",
        "Differentiator",
        "Instrumentation amplifier",
        "Precision rectifier",
        "Log amplifier",
        "Anti-log amplifier",
        "Oscillators: Barkhausen criteria",
        "Sinusoidal oscillators: LC, RC phase shift, Wien bridge",
        "Crystal oscillators",
        "Multivibrators"
      ]
    }
  },
  "Analog Circuits": {
    "Amplifiers": {
      "Small Signal Analysis": [
        "Transistor bias circuits",
        "Analysis of amplifier circuits",
        "Single stage amplifiers",
        "Multi-stage amplifiers",
        "Differential amplifiers",
        "Operational amplifier circuits",
        "Active filters",
        "Sinusoidal oscillators"
      ],
      "Frequency Response": [
        "Frequency response of amplifiers",
        "Miller effect",
        "Compensation techniques",
        "Stability and compensation"
      ]
    },
    "Feedback Systems": {
      "Feedback Amplifiers": [
        "Feedback topology",
        "Voltage series feedback",
        "Voltage shunt feedback",
        "Current series feedback",
        "Current shunt feedback",
        "Properties of negative feedback amplifiers",
        "Stability of feedback amplifiers"
      ]
    },
    "Power Amplifiers": {
      "Power Circuits": [
        "Class A power amplifiers",
        "Class B power amplifiers",
        "Class AB power amplifiers",
        "Class C power amplifiers",
        "Efficiency calculations",
        "Distortion analysis"
      ]
    },
    "Waveform Generators": {
      "Oscillators and Multivibrators": [
        "LC oscillators",
        "RC oscillators",
        "Crystal oscillators",
        "Astable multivibrators",
        "Monostable multivibrators",
        "Bistable multivibrators",
        "Schmitt triggers",
        "555 timer applications"
      ]
    }
  },
  "Digital Circuits": {
    "Number Systems": {
      "Basic Concepts": [
        "Number representation",
        "Binary arithmetic",
        "Boolean algebra",
        "Logic gates",
        "Minimization of Boolean functions",
        "Karnaugh maps",
        "Quine-McCluskey method"
      ]
    },
    "Combinational Circuits": {
      "Design and Analysis": [
        "Combinational circuit design",
        "Arithmetic circuits: adders, subtractors",
        "Code converters",
        "Multiplexers and demultiplexers",
        "Encoders and decoders",
        "Priority encoders",
        "Comparators"
      ]
    },
    "Sequential Circuits": {
      "Memory Elements": [
        "Latches and flip-flops",
        "Counters and shift registers",
        "Finite state machines",
        "Sequence generators and detectors",
        "Design with MSI components"
      ]
    },
    "Memory and Programmable Logic": {
      "Memory Systems": [
        "Semiconductor memories: ROM, SRAM, DRAM",
        "Memory organization",
        "Memory interfacing",
        "Programmable logic devices: PLA, PAL, CPLD, FPGA",
        "Number representation in digital systems",
        "Arithmetic operations",
        "Error detection and correction codes",
        "Hamming codes"
      ]
    },
    "Microprocessors": {
      "8085 Microprocessor": [
        "Architecture of 8085 microprocessor",
        "Programming model",
        "Instruction set",
        "Addressing modes",
        "Assembly language programming",
        "Interrupts",
        "Memory and I/O interfacing"
      ]
    }
  },
  "Control Systems": {
    "Mathematical Modeling": {
      "System Representation": [
        "Basic control system components",
        "Feedback principle",
        "Transfer function",
        "Block diagram representation",
        "Signal flow graph",
        "Mason's gain formula",
        "Modeling of mechanical, electrical and electromechanical systems"
      ]
    },
    "Time Domain Analysis": {
      "System Response": [
        "Standard test signals",
        "Time response of first order systems",
        "Time response of second order systems",
        "Steady-state error analysis",
        "Stability analysis",
        "Routh-Hurwitz stability criterion",
        "Root locus method"
      ]
    },
    "Frequency Domain Analysis": {
      "Frequency Response": [
        "Frequency response analysis",
        "Bode plots",
        "Polar plots",
        "Nyquist plots",
        "Stability analysis using Nyquist criterion",
        "Relative stability: gain margin and phase margin"
      ]
    },
    "Control System Design": {
      "Compensation Techniques": [
        "Design of control systems using root locus",
        "Design of control systems using frequency response",
        "Lead compensation",
        "Lag compensation",
        "Lead-lag compensation",
        "PID controllers"
      ]
    },
    "State Space Analysis": {
      "Modern Control": [
        "State space representation",
        "Solution of state equations",
        "Controllability and observability",
        "State feedback controller design",
        "Observer design"
      ]
    }
  },
  "Communications": {
    "Analog Communications": {
      "Amplitude Modulation": [
        "Amplitude modulation and demodulation",
        "AM signal analysis",
        "DSB-SC modulation",
        "SSB modulation",
        "VSB modulation",
        "Superheterodyne receivers",
        "AGC and AFC"
      ],
      "Angle Modulation": [
        "Frequency modulation",
        "Phase modulation",
        "FM signal analysis",
        "Generation of FM signals",
        "Detection of FM signals",
        "Pre-emphasis and de-emphasis",
        "FM receivers"
      ]
    },
    "Digital Communications": {
      "Digital Modulation": [
        "PCM, DPCM, DM, ADM",
        "Sampling theorem",
        "Quantization noise",
        "Baseband digital transmission",
        "Line codes",
        "Inter-symbol interference",
        "Eye diagrams",
        "Equalizers"
      ],
      "Digital Modulation Schemes": [
        "ASK, FSK, PSK, QPSK",
        "MSK, GMSK",
        "QAM modulation schemes",
        "Coherent and non-coherent detection",
        "Probability of error calculations",
        "Matched filter receivers",
        "Maximum likelihood detection"
      ]
    },
    "Information Theory": {
      "Source Coding": [
        "Entropy and mutual information",
        "Source coding theorem",
        "Huffman coding",
        "Shannon-Fano coding",
        "Lempel-Ziv coding"
      ],
      "Channel Coding": [
        "Channel capacity",
        "Shannon's channel coding theorem",
        "Linear block codes",
        "Hamming codes",
        "Cyclic codes",
        "Convolutional codes",
        "Viterbi decoding",
        "Turbo codes",
        "LDPC codes"
      ]
    },
    "Random Processes": {
      "Stochastic Analysis": [
        "Random variables and random processes",
        "Correlation functions",
        "Power spectral density",
        "White noise",
        "Noise in analog communication systems",
        "Noise in digital communication systems",
        "Signal-to-noise ratio calculations"
      ]
    }
  },
  "Electromagnetics": {
    "Electrostatics": {
      "Static Fields": [
        "Coulomb's law",
        "Electric field intensity",
        "Electric flux density",
        "Gauss's law",
        "Electric potential",
        "Properties of conductors and dielectrics",
        "Capacitance",
        "Boundary value problems",
        "Laplace's equation",
        "Poisson's equation"
      ]
    },
    "Magnetostatics": {
      "Magnetic Fields": [
        "Biot-Savart law",
        "Ampere's law",
        "Magnetic flux density",
        "Magnetic field intensity",
        "Magnetic materials",
        "Inductance",
        "Magnetic energy"
      ]
    },
    "Time-Varying Fields": {
      "Maxwell's Equations": [
        "Faraday's law",
        "Displacement current",
        "Maxwell's equations in integral form",
        "Maxwell's equations in differential form",
        "Boundary conditions",
        "Wave equation",
        "Poynting vector"
      ]
    },
    "Electromagnetic Waves": {
      "Wave Propagation": [
        "Plane waves in free space",
        "Plane waves in dielectric media",
        "Plane waves in conducting media",
        "Reflection and transmission at boundaries",
        "Standing waves",
        "VSWR",
        "Impedance matching"
      ]
    },
    "Transmission Lines": {
      "Guided Waves": [
        "Transmission line equations",
        "Characteristic impedance",
        "Propagation constant",
        "Input impedance",
        "Smith chart applications",
        "Impedance matching using stubs",
        "Quarter wave transformer",
        "Pulse propagation on transmission lines"
      ]
    },
    "Waveguides": {
      "Microwave Engineering": [
        "Rectangular waveguides",
        "TE and TM modes",
        "Cutoff frequencies",
        "Dispersion characteristics",
        "Microwave components: couplers, isolators, circulators",
        "Microwave measurements",
        "Cavity resonators"
      ]
    },
    "Antennas": {
      "Radiation and Propagation": [
        "Antenna fundamentals",
        "Radiation pattern",
        "Directivity and gain",
        "Antenna impedance",
        "Polarization"
      ]
    }
  }
};