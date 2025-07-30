import { SyllabusData } from '@/types/syllabus';

export const syllabusData: SyllabusData = {
  "Engineering Mathematics": {
    "Linear Algebra": {
      "Core Concepts": [
        "Vector space, basis, linear dependence and independence",
        "Matrix algebra",
        "Eigen values and eigen vectors",
        "Rank",
        "Solution of linear equations - existence and uniqueness"
      ]
    },
    "Calculus": {
      "Core Concepts": [
        "Mean value theorems",
        "Theorems of integral calculus",
        "Evaluation of definite and improper integrals",
        "Partial derivatives",
        "Maxima and minima",
        "Multiple integrals",
        "Line, surface and volume integrals",
        "Taylor series"
      ]
    },
    "Differential Equations": {
      "Core Concepts": [
        "First order equations (linear and nonlinear)",
        "Higher order linear differential equations",
        "Cauchy's and Euler's equations",
        "Methods of solution using variation of parameters",
        "Complementary function and particular integral",
        "Partial differential equations",
        "Variable separable method",
        "Initial and boundary value problems"
      ]
    },
    "Vector Analysis": {
      "Core Concepts": [
        "Vectors in plane and space",
        "Vector operations",
        "Gradient, divergence and curl",
        "Gauss's, Green's and Stokes’ theorems"
      ]
    },
    "Complex Analysis": {
      "Core Concepts": [
        "Analytic functions",
        "Cauchy’s integral theorem and formula",
        "Sequences and series, convergence tests",
        "Taylor and Laurent series",
        "Residue theorem"
      ]
    },
    "Probability and Statistics": {
      "Core Concepts": [
        "Mean, median, mode, standard deviation",
        "Combinatorial probability",
        "Probability distributions (Binomial, Poisson, Exponential, Normal)",
        "Joint and conditional probability"
      ]
    }
  },
  "Networks, Signals and Systems": {
    "Circuit Analysis": {
      "Fundamentals": [
        "Node and mesh analysis",
        "Superposition, Thevenin's theorem, Norton’s theorem, reciprocity",
        "Sinusoidal steady state analysis: phasors, complex power, maximum power transfer",
        "Time and frequency domain analysis of linear circuits: RL, RC and RLC circuits",
        "Solution of network equations using Laplace transform",
        "Linear 2-port network parameters",
        "Wye-delta transformation"
      ]
    },
    "Signals and Systems": {
      "Continuous-time": [
        "Fourier series and Fourier transform",
        "Sampling theorem and applications"
      ],
      "Discrete-time": [
        "DTFT, DFT, z-transform",
        "Discrete-time processing of continuous-time signals"
      ],
      "LTI Systems": [
        "Definition and properties, causality, stability",
        "Impulse response, convolution",
        "Poles and zeroes, frequency response",
        "Group delay, phase delay"
      ]
    }
  },
  "Electronic Devices": {
    "Semiconductor Physics": {
      "Fundamentals": [
        "Energy bands in intrinsic and extrinsic semiconductors",
        "Equilibrium carrier concentration",
        "Direct and indirect band-gap semiconductors"
      ],
      "Carrier Transport": [
        "Diffusion current, drift current, mobility and resistivity",
        "Generation and recombination of carriers",
        "Poisson and continuity equations"
      ]
    },
    "Semiconductor Devices": {
      "Diodes & Transistors": [
        "P-N junction",
        "Zener diode",
        "BJT",
        "MOS capacitor",
        "MOSFET"
      ],
      "Optoelectronic Devices": [
        "LED",
        "Photo diode",
        "Solar cell"
      ]
    }
  },
  "Analog Circuits": {
    "Diode Circuits": {
      "Applications": [
        "Clipping circuits",
        "Clamping circuits",
        "Rectifiers"
      ]
    },
    "BJT and MOSFET Amplifiers": {
      "Analysis": [
        "Biasing",
        "AC coupling",
        "Small signal analysis",
        "Frequency response"
      ]
    },
    "Advanced Circuits": {
      "Op-Amps & Amplifiers": [
        "Current mirrors and differential amplifiers",
        "Op-amp Circuits: Amplifiers, summers, differentiators, integrators",
        "Active filters",
        "Schmitt triggers and oscillators"
      ]
    }
  },
  "Digital Circuits": {
    "Fundamentals": {
      "Number Systems & Logic": [
        "Number Representations: Binary, integer and floating-point- numbers",
        "Boolean algebra",
        "Minimization of functions using Boolean identities and Karnaugh map",
        "Logic gates and their static CMOS implementations"
      ]
    },
    "Combinational Circuits": {
      "Building Blocks": [
        "Arithmetic circuits",
        "Code converters",
        "Multiplexers",
        "Decoders"
      ]
    },
    "Sequential Circuits": {
      "Core Concepts": [
        "Latches and flip-flops",
        "Counters, shift-registers",
        "Finite state machines",
        "Timing: propagation delay, setup and hold time, critical path delay"
      ]
    },
    "Data Converters and Memories": {
      "Components": [
        "Data Converters: Sample and hold circuits, ADCs and DACs",
        "Semiconductor Memories: ROM, SRAM, DRAM"
      ]
    },
    "Computer Organization": {
      "Architecture": [
        "Machine instructions and addressing modes",
        "ALU, data-path and control unit",
        "Instruction pipelining"
      ]
    }
  },
  "Control Systems": {
    "System Analysis": {
      "Modeling": [
        "Basic control system components",
        "Feedback principle",
        "Transfer function",
        "Block diagram representation",
        "Signal flow graph"
      ],
      "Performance": [
        "Transient and steady-state analysis of LTI systems",
        "Frequency response",
        "Routh-Hurwitz and Nyquist stability criteria",
        "Bode and root-locus plots"
      ],
      "Design": [
        "Lag, lead and lag-lead compensation",
        "State variable model and solution of state equation of LTI systems"
      ]
    }
  },
  "Communications": {
    "Random Processes": {
      "Analysis": [
        "Autocorrelation and power spectral density",
        "Properties of white noise",
        "Filtering of random signals through LTI systems"
      ]
    },
    "Analog Communications": {
      "Modulation & Demodulation": [
        "Amplitude modulation and demodulation (AM)",
        "Angle modulation and demodulation (FM)",
        "Spectra of AM and FM",
        "Super heterodyne receivers"
      ]
    },
    "Information Theory": {
      "Core Concepts": [
        "Entropy",
        "Mutual information",
        "Channel capacity theorem"
      ]
    },
    "Digital Communications": {
      "Techniques": [
        "PCM, DPCM",
        "Digital modulation schemes (ASK, PSK, FSK, QAM)",
        "Bandwidth, inter-symbol interference (ISI)"
      ],
      "Receivers & Error Correction": [
        "MAP, ML detection",
        "Matched filter receiver, SNR and BER",
        "Fundamentals of error correction, Hamming codes, CRC"
      ]
    }
  },
  "Electromagnetics": {
    "Maxwell's Equations": {
      "Fundamentals": [
        "Differential and integral forms and their interpretation",
        "Boundary conditions",
        "Wave equation",
        "Poynting vector"
      ]
    },
    "Plane Waves and Properties": {
      "Wave Propagation": [
        "Reflection and refraction",
        "Polarization",
        "Phase and group velocity",
        "Propagation through various media",
        "Skin depth"
      ]
    },
    "Transmission Lines & Waveguides": {
      "Core Concepts": [
        "Transmission Lines: Equations, characteristic impedance, impedance matching",
        "Impedance transformation, S-parameters, Smith chart",
        "Rectangular and circular waveguides",
        "Light propagation in optical fibers"
      ]
    },
    "Antennas": {
      "Fundamentals": [
        "Dipole and monopole antennas",
        "Linear antenna arrays"
      ]
    }
  }
};
