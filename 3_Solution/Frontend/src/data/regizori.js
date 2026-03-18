export const listaRegizori = [
  {
    id: "r1",
    nume: "Matei Dima",
    varsta: 33,
    descriere: "Matei Dima nu este doar actor, ci și producător și co-regizor al succesului de box-office Teambuilding. A demonstrat că înțelege gustul publicului românesc și că poate crea comedii relevante, moderne, cu impact comercial uriaș.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Matei_Dima.jpg/440px-Matei_Dima.jpg",
    filmIds: [1],
    serialeIds: []
  },
  {
    id: "r2",
    nume: "Nae Caranfil",
    varsta: 62,
    descriere: "Nae Caranfil este unul dintre cei mai importanți regizori din cinematografia română contemporană. Cu filme precum Filantropica, E pericoloso sporgersi și Restul e tăcere, și-a construit un stil inconfundabil — ironic, inteligent și uman. Este considerat un maestru al comediei românești.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Nae_Caranfil_2016.jpg/440px-Nae_Caranfil_2016.jpg",
    filmIds: [2],
    serialeIds: []
  },
  {
    id: "r3",
    nume: "Cristian Iliușan",
    varsta: 45,
    descriere: "Cristian Iliușan este un regizor român specializat în comedii cu parfum de Ardeal. Filmul Mirciulică, realizat în colaborare cu Mircea Bravo, a dovedit că poate valorifica autenticitatea regională pentru a crea entertainment de calitate.",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_image_available.png",
    filmIds: [3],
    serialeIds: []
  },
  {
    id: "r4",
    nume: "Cristian Mungiu",
    varsta: 56,
    descriere: "Cristian Mungiu este cel mai premiat regizor român în viață. A câștigat Palme d'Or la Cannes în 2007 cu 4 luni, 3 săptămâni și 2 zile, plasând cinematografia românească pe harta mondială. Filmele sale, marcate de realism brutal și tensiune psihologică, sunt studiate în școli de film din întreaga lume.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Cristian_Mungiu.jpg/440px-Cristian_Mungiu.jpg",
    filmIds: [4],
    serialeIds: []
  },
  {
    id: "r5",
    nume: "Tudor Giurgiu",
    varsta: 57,
    descriere: "Tudor Giurgiu este regizor, producător și director al TIFF Cluj. A construit o carieră solidă atât în spatele camerei cât și ca promotor al cinematografiei române la nivel internațional. Filmul Libertate este o producție ambițioasă despre Revoluția din 1989, demonstrând maturitatea sa artistică.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Tudor_Giurgiu.jpg/440px-Tudor_Giurgiu.jpg",
    filmIds: [5],
    serialeIds: []
  },
  {
    id: "r6",
    nume: "Bogdan Mirică",
    varsta: 46,
    descriere: "Bogdan Mirică este un scenarist și regizor român care a câștigat aprecierea internațională cu filmul Câini (2016), prezentat la Cannes. Ca regizor al serialului Umbre, a impus un ton cinematic rar întâlnit pe micul ecran românesc, transformând serialul într-un fenomen cultural.",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_image_available.png",
    filmIds: [],
    serialeIds: [101]
  },
  {
    id: "r7",
    nume: "Anghel Damian",
    varsta: 36,
    descriere: "Anghel Damian este un regizor de teatru și televiziune care a revoluționat serialele românești cu producția Clanul. Stilul său vizual îndrăzneț, influențat de productions internaționale de top, a ridicat ștacheta pentru tot ce a urmat în industria locală.",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_image_available.png",
    filmIds: [],
    serialeIds: [102]
  },
  {
    id: "r8",
    nume: "Dragoș Buliga",
    varsta: 50,
    descriere: "Dragoș Buliga este regizorul și co-creatorul serialului de comedie Las Fierbinți, cel mai longeviv serial românesc din ultimele decenii. A știut să construiască personaje iubitoare de public și să mențină prospețimea comediei de-a lungul a numeroase sezoane.",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_image_available.png",
    filmIds: [],
    serialeIds: [103]
  },
  {
    id: "r9",
    nume: "Christopher Smith",
    varsta: 52,
    descriere: "Christopher Smith este un regizor britanic cunoscut pentru thrillerele sale psihologice (Creep, Triangle, Black Death). Implicarea sa în producția Spy/Master a adus o perspectivă internațională producției românești, contribuind la calitatea vizuală și narativă a serialului.",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_image_available.png",
    filmIds: [],
    serialeIds: [104]
  },
  {
    id: "r10",
    nume: "Jesús del Cerro",
    varsta: 48,
    descriere: "Jesús del Cerro este un regizor spaniol care a colaborat cu producători români pe serialul Vlad. Experiența sa în producții de acțiune și dramă a adus un ritm alert și o estetică modernă serialului.",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_image_available.png",
    filmIds: [],
    serialeIds: [105]
  }
];

// Funcție helper pentru a găsi un regizor după ID
export const getRegizorById = (id) => listaRegizori.find(r => r.id === id);

// Funcție helper pentru a găsi un regizor după nume
export const getRegizorByNume = (nume) => listaRegizori.find(r => r.nume === nume);
