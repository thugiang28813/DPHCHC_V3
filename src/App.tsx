import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  BrainCircuit,
  Search,
  RotateCcw,
  Check,
  X,
  atom,
  Home,
  FlaskConical,
  ChevronRight,
  Trophy,
  ArrowRightLeft,
  Layers,
  FileText,
} from "lucide-react";
import "./index.css";

// --- DỮ LIỆU HÓA 12 (CHUẨN CT 2018) ---
const grade12Data = [
  // --- CHƯƠNG 1: ESTER - LIPID ---
  {
    id: 1,
    formula: "HCOOC2H5",
    name: "Ethyl methanoate",
    type: "Ester",
    commonName: "Ethyl formate",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 2,
    formula: "CH3COOC2H5",
    name: "Ethyl ethanoate",
    type: "Ester",
    commonName: "Ethyl acetate",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 3,
    formula: "CH3COOCH=CH2",
    name: "Ethenyl ethanoate",
    type: "Ester",
    commonName: "Vinyl acetate",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 4,
    formula: "CH2=CHCOOCH3",
    name: "Methyl propenoate",
    type: "Ester",
    commonName: "Methyl acrylate",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 5,
    formula: "CH2=C(CH3)COOCH3",
    name: "Methyl 2-methylpropenoate",
    type: "Ester",
    commonName: "Methyl methacrylate",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 6,
    formula: "CH3COOC6H5",
    name: "Phenyl ethanoate",
    type: "Ester",
    commonName: "Phenyl acetate",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 7,
    formula: "(C17H35COO)3C3H5",
    name: "Propane-1,2,3-triyl tristearate",
    type: "Lipid",
    commonName: "Tristearin",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 8,
    formula: "(C17H33COO)3C3H5",
    name: "Propane-1,2,3-triyl trioleate",
    type: "Lipid",
    commonName: "Triolein",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 9,
    formula: "C15H31COOH",
    name: "Hexadecanoic acid",
    type: "Fatty Acid",
    commonName: "Palmitic acid",
    chapter: "Chương 1: Ester-Lipid",
  },

  // --- CHƯƠNG 2: CARBOHYDRATE ---
  {
    id: 10,
    formula: "C6H12O6",
    name: "Glucose",
    type: "Monosaccharide",
    commonName: "Đường nho",
    chapter: "Chương 2: Carbohydrate",
  },
  {
    id: 11,
    formula: "C6H12O6",
    name: "Fructose",
    type: "Monosaccharide",
    commonName: "Đường mật ong",
    chapter: "Chương 2: Carbohydrate",
  },
  {
    id: 12,
    formula: "C12H22O11",
    name: "Saccharose",
    type: "Disaccharide",
    commonName: "Sucrose / Đường mía",
    chapter: "Chương 2: Carbohydrate",
  },
  {
    id: 13,
    formula: "C12H22O11",
    name: "Maltose",
    type: "Disaccharide",
    commonName: "Đường mạch nha",
    chapter: "Chương 2: Carbohydrate",
  },
  {
    id: 14,
    formula: "(C6H10O5)n",
    name: "Starch",
    type: "Polysaccharide",
    commonName: "Tinh bột",
    chapter: "Chương 2: Carbohydrate",
  },
  {
    id: 15,
    formula: "(C6H10O5)n",
    name: "Cellulose",
    type: "Polysaccharide",
    commonName: "Xenlulozơ",
    chapter: "Chương 2: Carbohydrate",
  },

  // --- CHƯƠNG 3: AMINE - AMINO ACID - PEPTIDE ---
  {
    id: 16,
    formula: "CH3NH2",
    name: "Methanamine",
    type: "Amine",
    commonName: "Methylamine",
    chapter: "Chương 3: N-Compounds",
  },
  {
    id: 17,
    formula: "C2H5NH2",
    name: "Ethanamine",
    type: "Amine",
    commonName: "Ethylamine",
    chapter: "Chương 3: N-Compounds",
  },
  {
    id: 18,
    formula: "C6H5NH2",
    name: "Benzenamine",
    type: "Amine",
    commonName: "Aniline",
    chapter: "Chương 3: N-Compounds",
  },
  {
    id: 19,
    formula: "H2NCH2COOH",
    name: "Aminoethanoic acid",
    type: "Amino Acid",
    commonName: "Glycine (Gly)",
    chapter: "Chương 3: N-Compounds",
  },
  {
    id: 20,
    formula: "CH3CH(NH2)COOH",
    name: "2-Aminopropanoic acid",
    type: "Amino Acid",
    commonName: "Alanine (Ala)",
    chapter: "Chương 3: N-Compounds",
  },
  {
    id: 21,
    formula: "(CH3)2CHCH(NH2)COOH",
    name: "2-Amino-3-methylbutanoic acid",
    type: "Amino Acid",
    commonName: "Valine (Val)",
    chapter: "Chương 3: N-Compounds",
  },
  {
    id: 22,
    formula: "H2N(CH2)4CH(NH2)COOH",
    name: "2,6-Diaminohexanoic acid",
    type: "Amino Acid",
    commonName: "Lysine (Lys)",
    chapter: "Chương 3: N-Compounds",
  },
  {
    id: 23,
    formula: "HOOC(CH2)2CH(NH2)COOH",
    name: "2-Aminopentanedioic acid",
    type: "Amino Acid",
    commonName: "Glutamic acid (Glu)",
    chapter: "Chương 3: N-Compounds",
  },

  // --- CHƯƠNG 4: POLYMER ---
  {
    id: 24,
    formula: "(-CH2-CH2-)n",
    name: "Polyethylene",
    type: "Polymer",
    commonName: "PE",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 25,
    formula: "(-CH2-CHCl-)n",
    name: "Poly(vinyl chloride)",
    type: "Polymer",
    commonName: "PVC",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 26,
    formula: "(-CH2-CH(C6H5)-)n",
    name: "Polystyrene",
    type: "Polymer",
    commonName: "PS",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 27,
    formula: "(-NH[CH2]6NHCO[CH2]4CO-)n",
    name: "Poly(hexamethylene adipamide)",
    type: "Polymer",
    commonName: "Nylon-6,6",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 28,
    formula: "(-CH2-C(CH3)(COOCH3)-)n",
    name: "Poly(methyl methacrylate)",
    type: "Polymer",
    commonName: "Plexiglas / Thủy tinh hữu cơ",
    chapter: "Chương 4: Polymer",
  },
];

// --- HELPER COMPONENTS ---

const ChemicalFormula = ({ text, className = "" }) => {
  if (!text) return null;
  const parts = text.split(/(\d+|n)/);
  return (
    <span className={`font-mono tracking-wide ${className}`}>
      {parts.map((part, index) =>
        /^(\d+|n)$/.test(part) ? (
          <sub key={index} className="text-[0.75em] relative top-[0.2em]">
            {part}
          </sub>
        ) : (
          part
        )
      )}
    </span>
  );
};

// --- MODES ---

const FlashcardMode = () => {
  const [chapter, setChapter] = useState("All");
  const [queue, setQueue] = useState([]);
  const [masteredCount, setMasteredCount] = useState(0);
  const [totalSessionCards, setTotalSessionCards] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  const startSession = (selectedChapter) => {
    let data = grade12Data;
    if (selectedChapter !== "All") {
      data = grade12Data.filter((c) => c.chapter === selectedChapter);
    }
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    setQueue(shuffled);
    setTotalSessionCards(shuffled.length);
    setMasteredCount(0);
    setIsFlipped(false);
    setIsFinished(false);
  };

  useEffect(() => {
    startSession("All");
  }, []);

  const handleNext = (mastered) => {
    setIsFlipped(false);
    setTimeout(() => {
      if (mastered) {
        setMasteredCount((prev) => prev + 1);
        setQueue((prev) => {
          const [, ...rest] = prev;
          if (rest.length === 0) setIsFinished(true);
          return rest;
        });
      } else {
        setQueue((prev) => {
          const [current, ...rest] = prev;
          return [...rest, current];
        });
      }
    }, 200);
  };

  const currentCard = queue[0];
  const progress =
    totalSessionCards > 0 ? (masteredCount / totalSessionCards) * 100 : 0;

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-in fade-in">
        <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Hoàn Thành Chương!
        </h2>
        <p className="text-slate-500 mb-6">
          Bạn đã ôn tập xong {totalSessionCards} chất.
        </p>
        <button
          onClick={() => startSession(chapter)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg active:scale-95"
        >
          Học Lại
        </button>
      </div>
    );
  }

  if (!currentCard)
    return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="flex flex-col items-center w-full h-full max-w-md mx-auto p-4 pb-20">
      {/* Filter & Controls */}
      <div className="w-full mb-4 space-y-2">
        <div className="flex justify-between items-center">
          <select
            className="bg-white border border-slate-200 text-sm rounded-lg p-2 font-medium text-slate-700 max-w-[60%]"
            value={chapter}
            onChange={(e) => {
              setChapter(e.target.value);
              startSession(e.target.value);
            }}
          >
            <option value="All">Tất cả các chương</option>
            <option value="Chương 1: Ester-Lipid">Chương 1: Ester-Lipid</option>
            <option value="Chương 2: Carbohydrate">
              Chương 2: Carbohydrate
            </option>
            <option value="Chương 3: N-Compounds">
              Chương 3: Amin-Amino Acid
            </option>
            <option value="Chương 4: Polymer">Chương 4: Polymer</option>
          </select>
          <div className="text-xs font-bold text-blue-600">
            {masteredCount}/{totalSessionCards}
          </div>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Toggle Reverse */}
      <button
        onClick={() => {
          setIsReversed(!isReversed);
          setIsFlipped(false);
        }}
        className="mb-4 flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full"
      >
        <ArrowRightLeft className="w-3 h-3" />{" "}
        {isReversed ? "Chế độ: Tên -> Công thức" : "Chế độ: Công thức -> Tên"}
      </button>

      {/* Card */}
      <div
        className="relative w-full flex-1 min-h-[300px] perspective-1000 group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative w-full h-full transition-all duration-500 transform-style-3d cursor-pointer shadow-2xl rounded-3xl ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* FRONT */}
          <div className="absolute w-full h-full bg-white rounded-3xl border border-slate-100 flex flex-col items-center justify-center backface-hidden p-6">
            <div className="absolute top-4 left-4 px-2 py-1 bg-slate-50 rounded text-[10px] font-bold text-slate-400 uppercase">
              {currentCard.chapter}
            </div>
            <div className="text-sm uppercase tracking-widest text-slate-400 mb-4 font-bold">
              {isReversed ? "Tên gọi" : "Công thức"}
            </div>
            {isReversed ? (
              <h3 className="text-2xl font-bold text-slate-800 text-center">
                {currentCard.name}
              </h3>
            ) : (
              <ChemicalFormula
                text={currentCard.formula}
                className="text-4xl sm:text-5xl text-slate-800 font-bold text-center"
              />
            )}
            <div className="mt-8 text-blue-500 text-xs font-medium animate-pulse bg-blue-50 px-3 py-1 rounded-full">
              Chạm để lật
            </div>
          </div>

          {/* BACK */}
          <div className="absolute w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex flex-col items-center justify-center backface-hidden rotate-y-180 text-white p-6">
            <div className="text-sm uppercase tracking-widest text-blue-100 mb-2 font-bold">
              {isReversed ? "Công thức" : "Tên IUPAC"}
            </div>
            {isReversed ? (
              <ChemicalFormula
                text={currentCard.formula}
                className="text-4xl font-bold mb-4"
              />
            ) : (
              <h3 className="text-2xl font-bold mb-4 text-center">
                {currentCard.name}
              </h3>
            )}

            {currentCard.commonName && (
              <div className="mt-2 bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm text-center">
                <div className="text-[10px] opacity-70 uppercase tracking-wide">
                  Tên thường / Khác
                </div>
                <div className="text-lg font-medium text-yellow-300">
                  {currentCard.commonName}
                </div>
              </div>
            )}
            <div className="mt-4 inline-block bg-black/20 px-2 py-1 rounded text-xs">
              Loại: {currentCard.type}
            </div>
          </div>
        </div>
      </div>

      {/* Actions - Only show when flipped */}
      <div
        className={`w-full grid grid-cols-2 gap-3 mt-6 transition-opacity duration-300 ${
          isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext(false);
          }}
          className="bg-red-100 text-red-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95"
        >
          <RotateCcw className="w-4 h-4" /> Chưa thuộc
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext(true);
          }}
          className="bg-green-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-200 active:scale-95"
        >
          <Check className="w-4 h-4" /> Đã thuộc
        </button>
      </div>
    </div>
  );
};

const QuizMode = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);

  const questionData = grade12Data[currentQ];

  const options = useMemo(() => {
    if (!questionData) return [];
    const wrong = grade12Data
      .filter((i) => i.id !== questionData.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return [...wrong, questionData].sort(() => 0.5 - Math.random());
  }, [questionData]);

  const handleSelect = (opt) => {
    if (selected) return;
    setSelected(opt);
    if (opt.id === questionData.id) setScore((s) => s + 1);
    setTimeout(() => {
      if (currentQ < 9) {
        setCurrentQ((q) => q + 1);
        setSelected(null);
      } else setFinished(true);
    }, 1000);
  };

  if (finished)
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="text-4xl font-black text-blue-600 mb-2">{score}/10</div>
        <div className="text-slate-500 mb-6">Điểm số của bạn</div>
        <button
          onClick={() => {
            setScore(0);
            setCurrentQ(0);
            setFinished(false);
            setSelected(null);
          }}
          className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold"
        >
          Làm lại bài thi
        </button>
      </div>
    );

  return (
    <div className="w-full max-w-md mx-auto p-4 flex flex-col h-full pb-20">
      <div className="flex justify-between mb-4">
        <span className="font-bold text-slate-400 text-sm">
          Câu {currentQ + 1}/10
        </span>
        <span className="font-bold text-blue-600 text-sm">Điểm: {score}</span>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-4 flex flex-col items-center min-h-[150px] justify-center">
        <div className="text-xs font-bold text-slate-400 uppercase mb-2">
          Chất này là gì?
        </div>
        <ChemicalFormula
          text={questionData.formula}
          className="text-3xl font-bold text-slate-800 text-center"
        />
      </div>

      <div className="space-y-3">
        {options.map((opt) => {
          let style = "bg-white border-2 border-slate-100 text-slate-600";
          if (selected) {
            if (opt.id === questionData.id)
              style = "bg-green-500 border-green-500 text-white";
            else if (opt.id === selected.id)
              style = "bg-red-500 border-red-500 text-white";
            else style = "bg-slate-50 border-slate-100 text-slate-300";
          }
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt)}
              className={`w-full p-4 rounded-xl font-bold text-left transition-all ${style}`}
            >
              {opt.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const DictionaryMode = () => {
  const [search, setSearch] = useState("");
  const filtered = grade12Data.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.formula.toLowerCase().includes(search.toLowerCase()) ||
      (c.commonName &&
        c.commonName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full p-4 max-w-md mx-auto pb-20">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Tìm: Ester, Glucose, Ala..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center"
          >
            <div>
              <div className="font-bold text-blue-700">
                <ChemicalFormula text={item.formula} />
              </div>
              <div className="font-bold text-slate-800 text-sm">
                {item.name}
              </div>
              {item.commonName && (
                <div className="text-xs text-slate-500 italic">
                  {item.commonName}
                </div>
              )}
            </div>
            <div className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded uppercase max-w-[80px] text-right">
              {item.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- APP SHELL ---

const App = () => {
  const [tab, setTab] = useState("learn");

  return (
    <div className="fixed inset-0 bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Header */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-center shrink-0 z-10">
        <div className="flex items-center gap-2 font-bold text-lg text-slate-800">
          <FlaskConical className="w-6 h-6 text-blue-600" />
          Hóa 12{" "}
          <span className="text-blue-600 text-xs border border-blue-600 px-1 rounded ml-1">
            2018
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative">
        {tab === "learn" && <FlashcardMode />}
        {tab === "quiz" && <QuizMode />}
        {tab === "dict" && <DictionaryMode />}
      </div>

      {/* Bottom Tab Bar (Mobile Style) */}
      <div className="h-16 bg-white border-t border-slate-200 flex justify-around items-center shrink-0 pb-safe z-20">
        <TabItem
          icon={<BookOpen className="w-6 h-6" />}
          label="Học bài"
          active={tab === "learn"}
          onClick={() => setTab("learn")}
        />
        <TabItem
          icon={<BrainCircuit className="w-6 h-6" />}
          label="Kiểm tra"
          active={tab === "quiz"}
          onClick={() => setTab("quiz")}
        />
        <TabItem
          icon={<Search className="w-6 h-6" />}
          label="Tra cứu"
          active={tab === "dict"}
          onClick={() => setTab("dict")}
        />
      </div>
    </div>
  );
};

const TabItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
      active ? "text-blue-600" : "text-slate-400"
    }`}
  >
    {icon}
    <span className="text-[10px] font-bold mt-1">{label}</span>
  </button>
);

export default App;
