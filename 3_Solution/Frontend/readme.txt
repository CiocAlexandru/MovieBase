							PROIECT DE LABORATOR WEB: PELICULA MEDIA - Platformă Interactivă de Recenzii
																	AUTOR: Cioc Alexandru
																	GRUPA: C113B	


   Prezentul document reprezeintă portofoliul arhitectural și ghidul oficial de evaluare / utilizare a proiectului de Frontend "Pelicula". 
   Proiectul depășește realizarea unor simple pagini HTML individuale, optând pentru o arhitectură superioară de tipul "Single Page Application" (SPA) dezvoltată organic. 
   Scopul a fost atingerea exigențelor pe fiecare punct al baremului, combinată cu o viziune estetică modernă.


1. DOVADA ÎNDEPLINIRII CERINȚELOR DE BAREM

[1p] Module de autentificare și editare a unui cont (Login/Register/Edit Profile):
  - IMPLEMENTAT: Au fost create template-uri complete (`Login.jsx`, `Register.jsx`, `EditProfile.jsx`, `ForgotPassword.jsx`). Diferența este că nu sunt doar câmpuri statice: 
     am implementat sisteme de gestiune a stării React (`useState`) ce preiau vizual datele și folosesc Context API pentru a "simula" momentul de conectare cu succes în memoria 
     browserului, adaptând astfel meniul de navigație ulterior.
  * NOTĂ ROLURI CONECTARE: Aplicația funcționează vizual pe 3 roluri majore: "Guest", "User" și "Administrator". Accentuez faptul că rolul de "Guest" nu este implementat explicit 
     printr-o clasă de date, ci reprezintă tocmai modul implicit (restricționat) prin care platforma este accesată de orice vizitator încă neautentificat.

[1p] Pagina de Start a aplicației (Homepage):
  - IMPLEMENTAT: Ruta principală `/` ("Landing Page") aduce un design Hero imersiv și integrează colecții grid bazate pe flexbox, prezentând cele mai curente/populare card-uri de filme.

[1p] Pagina principală specifică tematicii aplicației (Dashboard-uri / Cataloage):
  - IMPLEMENTAT: Proiectul prezintă zeci de afișaje prin cataloage dinamice listate (Leaderboards). "Top Filme", "Top Seriale", "Top Actori" – au layout-uri specifice, 
    listând ierarhic sute de metadate ce compun structura principală a aplicației (rank număr, postere la calitate HD, rezumat, badge de scor calitativ).

[1p] Pagina de Administrare a site-ului:
  - IMPLEMENTAT: Accesând `/admin` utilizatorul devine un manager. Există tab-uri comutabile condiționat (`activeTab === 'filme'`), permițând vizualizarea și ștergerea rândurilor 
    native dintr-un grafic tip Tabel curat, alături de Pop-Up Modals (Overlay) cu formulare de Editare (fără să părăsești pagina curentă). 

[1p] O pagină de contact (cu Date, Hartă, Email funcțional, Social Media):
  - IMPLEMENTAT: Pagina de Suport `/suport` cuprinde absolut toate normele. Cărțile de contact, Formularul stilizat de Customer Support și ancorele vizuale.
  * NOTĂ MATERIAL DE STUDIU: Pentru funcționalitatea Hărții interactive (sistem Embed), am plasat intenționat adresa fizică a curții Academiei. Pentru partea de Rețele Sociale 
   ("Social Media"), am descoperit o organizație publică online denumită fix "Pelicula Media" și am utilizat link-urile lor către propriile rețele pentru a conferi autenticitate.
   (Paginile de Instagram/Faceook/Youtube din link-uri nu au fost create de mine, fiind folosite strict tehnic, în scop academic/didactic).

[1p] O galerie de imagini (cu derulare automată la 3 secunde):
  - IMPLEMENTAT: Condiția este îndeplinită creativ prin modulul central "Hero-Slider" plasat pe Homepage. Folosind tehnologia "setInterval" via hook-ul `useEffect()`, 
    imaginea de fundal a filmului promovat și elementele adiacente text se derulează organic spre stânga EXACT din 3 în 3 secunde, generând automat o galerie estetică infinită.

[1p] Caracteristica Responsive (Adaptabilitate web):
  - IMPLEMENTAT: Media Queris (ex. `md:flex-col`, `lg:grid-cols-4` folosind sintaxa Tailwind CSS). Dispunerea tabletei ori a telefonului redimensionează complet header-ul 
    central și comprimă Navbar-ul într-un buton izolat (Burger Menu-like logic).

[1p] Design Premium: Abordare "Dark Mode" & "Glassmorphism" cu Backdrop Filter și accente specifice companiilor tip streaming VOD.
[1p] Originalitate: Conform argumentelor din Secțiunea 3 (de mai jos).


2. ARHITECTURA ȘI TEHNOLOGIILE IMPLEMENTATE (DETALII TEHNICE)

A. Arhitectura Paginilor: "Single Page Application (SPA)" generată prin pachetul de transpilare Vite. Aceasta asigură un index.html pur care importă modular structurile.
B. Interconectare și Rutarea: `React-Router-DOM` asigură afișarera paginilor ca și cum te-ai transfera prin documente noi la fiecare click (`<Link to="...">`), dar evită solicitările 
   HTML server-side, garantând fluiditatea de o sută de procente a șabloanelor Web.
C. Design Componentizat CSS/Tailwind: O simbioză curată între manipularea DOM-ului vizual prin clase de utilitate (Tailwind Framework direct inline) permițând padding și grid-uri rapide, 
   susținut de fișiere Vanilla CSS externe (`MovieDetails.css`, `Admin.css`) exclusiv pentru elementele custom cum sunt animațiile rotative, elementele scrollbar invizibile și structuri 
   ultra specifice ce suprascriau elementul root.
D. Modelarea Datelor (Mocking API Logic): 
 - Gestiunea structurilor html manuale pentru zeci de filme / seriale ar fi rezultat într-un "amestec" imposibil de menținut.
 - Ca demonstrație arhitecturală, am construit matrici de stocare (Objects/JSON) permițând iterarea acestora via metoda logică javascript `.map()`, 
   construind astfel layout-uri imense tip grilă elegant și complet modularizat. 


3. CONTRIBUȚII PERSONALE ȘI ORIGINALITATE:
   Proiectul demonstrează acumularea de noi skill-uri practice de Frontend, distanțându-se de machetele HTML simple prin volumul de cod scris, numărul de pagini realizate de la zero și 
complexitatea funcțiilor integrate. Contribuțiile majore constau în:

 I. DEZVOLTAREA A +15 PAGINI ȘI RUTE DISTINCTE (Efort volumic):
     Față de cele aproximativ 5 pagini schematice cerute, am extins platforma scriind manual codul pentru o multitudine de șabloane React (`Home.jsx`, `NewReleases.jsx`, 
   `PopularMovies.jsx`,  `TopActori.jsx`, `TopRegizori.jsx`, `Watchlist.jsx`), pagini de detalii dinamice (`MovieDetails.jsx`, `ActorDetails.jsx`, `DirectorDetails.jsx`), secțiunea 
    de `Admin.jsx` și formularele de `Login`/`Register`. Fiecare a necesitat sute de linii de organizare de grid-uri, padding și containere custom.

 II. CONSTRUIREA BAREI DE CĂUTARE UNIVERSALĂ (Algoritmi Live Filtering):
     Am implementat nativ o bară de search care ascultă input-ul și filtrează asincron baza de date (array-urile cu filme, seriale, actori). Rezultatele sunt redate instant într-o 
   sticlă de display sub tastatură, învățând astfel gestionarea event-urilor în timp real.

 III. GESTIONAREA STĂRILOR ȘI A CONTEXTULUI (Global Auth & Local Storage):
     Pentru a simula o experiență reală offline, am scris un "Context API Provider". Astfel, am validat concepte noi: salvarea credentialelor în `localStorage` și schimbarea automată
   a Navbar-ului în momentul logării (apariția panoului de Profil și ascunderea butoanelor de logare).

 IV. IMPLEMENTAREA ESTETICII GLASSMORPHISM ȘI A LAYOUT-ULUI MOBILE-FIRST:
     Am folosit masiv tehnica `backdrop-blur` și scheme cromatice avansate (Midnight/Indigo) pentru design. Adițional, tot CSS-ul fost scris respectând paradigma "Mobile First",
  am testat și folosit breakpoint-urile (`sm`, `md`, `lg`) pentru a reproiecta interfața pe zecile de pagini, scriind de la Navbar Responsive (Hamburger Menu) la rearanjarea tabelelor
  din secțiunile "Topuri".

 V. ARHITECTURA "STATE-DRIVEN" (Hook-uri React):
     Funcționalitatea aplicației, de la adăugarea filmelor în Watchlist (care își schimbă statusul pe loc) până la afișarea overlay-ului modal de Video-Trailer, a fost programată renunțând 
  la styling static. Am utilizat intens React Hooks (`useState`, `useEffect`) pentru a randa și modifica vizual componentele strict pe bază de stare asincronă a memoriei browserului.

 VI. EXPERIMENTE DE CSS SOLUȚIONATE (Dual-Layer Backdrop Scaling):
     Pentru a afișa postere de film verticale într-un slider orizontal fără a le taia și distorsiona (Sliderul Hero din Home.jsx), am programat o soluție CSS avansată suprapunând 2 layere: 
  un layer blurat pe post de fundal scalat (`blur-3xl`) și afișul curat deasupra cu proprietatea `object-contain`.

 VII. COMPONENTIZARE (Evitarea codului repetitiv):
      Învățând standardele moderne, am separat segmentele globale (Navbar, Footer, Card-uri de film) în fisiere separate. Această modularizare extremă elimină liniile redundante și
  demonstrează respectarea strictă a principiului "DRY" (Don't Repeat Yourself).

 VIII. SISTEMUL DE LEADERBOARD ȘI CLASAMENTE (Paginile de Topuri):
     Am conceput secțiuni complexe de la zero, structurate matematic pentru `TopMovies.jsx`, `TopSeriale.jsx`, `TopActori.jsx` și `TopRegizori.jsx`. Datele brute sunt ierarhizate 
 fluid pe ecran, fiind afișate sub formă de liste cu ranking, badge-uri aurii pe notare și design tabelar complet responsive.

 IX. PANOU DE ADMINISTRARE ȘI GESTIUNE (Admin.jsx):
     M-am asigurat că dezvolt și latura de Control. Am programat manual o pagină de `Admin Dashboard` ce simulează direct în pagină o structură CRUD (Permite afișarea interactivă, 
 interacțiuni cu butoane Delete/Edit prin stări dinamice React), totul fiind condiționat exclusiv pentru conturile asociate nivelului de "Administrator".

 X. STRUCTURI COMPLEXE DE SUPORT ȘI INTERACȚIUNE UI (Suport.jsx):
     Depășind sfera simplă vizuală a filmelor, am construit o pagină dedicată de Help/Contact Center. Efortul s-a concentrat aici pe algoritmii de tip "Accordion" 
 (FAQ care se expandează pe click și ascunde textele bazat pe boolean-uri stateful) și pe grafice vectoriale implementate corect.

 XI. INTEGRARE LOGICĂ FORMULARE (Control Authentificare):
     Paginile de `Login.jsx` și `Register.jsx`, precum și vizualizarea `EditProfile.jsx` nu sunt machiaje front-end statice. Ele comunică cu hook-uri de preluare de valori 
 (`onChange`), controlând manual tot input-ul utilizatorului și simulând perfect fluiditatea dintr-un ecosistem full-stack.

 XII. STRUCTURARE PROFESIONALĂ "MOCK-API" (Data Modeling):
     Ca să nu fie o pagină superficială, m-am asigurat că toate pozele și zecile de entități din array-urile mele `.js` folosesc standardizarea strictă de baze de date tip JSON 
 (ID-uri unice, Câmpuri de rating exacte etc). Această contribuție de arhitectură demonstrează că proiectul creat de mine este pregătit pentru conectare directă cu un Backend Server /
  Bază de date SQL fără să i se schimbe funcționalitatea de afișare.



4. PAS CU PAS: FLUXUL PENTRU EVALUARE (SCENARIU TESTING COMPLEX)

 Recomandata executarea acestor pași clari de verificare la adresa randată (ex: localhost:5173 ) pentru a trasa punctajele finale:

 [PASUL 1: RULAREA GALERIEI HOME]. 
     Vă aflați pe URL-ul `/`. Opriți acțiunea mouse-ului! Priviți exclusiv Bannerul Masiv principal. Observați că elementul de fundal glisează automat transpoziționând texte, rezumate
  și fotografii la ficare intersecție de fix 3 secunde via logica de JS component interval-timer (Implementata norma Galerie Automată). Faceți ulterior un simplu Scroll Down pt 
  Catalogul default "Noutăți".

 [PASUL 2: BARA DE ASISTENȚĂ LIVE]. 
     Puneți focus pe bara superioară ("Caută..."). Introduceți manual "Vlad". Observați instantaneitatea Dropdown-ului care afișează corect imaginea găsită cu ajutorul scriptului 
  logic React atașat formularului, chiar și 100% offline. 

 [PASUL 3: IERARHIZAREA CLASAMENTELOR]. 
   Duceți cursorul la meniul dropdown central "Topuri" > dați click pe " Filme" (Navigați la `/top-filme`). Vă rog analizați aici arhitectura tabelară (Rank Leaderboard), 
 imaginile posterului adaptabil, badge-urile grafice galbene tip stea de Note și design fluid (care își resetează coloanele de vizualizare complet ascunse pe ecranele compact).

 [PASUL 4: TESTAREA AUTENTIFICĂRII SI A RUTELOR RESTRICȚIONATE]. 
    Navigati înapoi folosind meniul de sus apasand Profil >> "Autentificare". Scrieți textul mock-up și apăsați butonul principal "Intră în Cont".
 IMEDIAT! Paginia devine o rută "Safe". Meniurile vechi de navigare s-au dezactivat logic și vizual. Aveți acum deblocat opțiunea "Editează Profil" pentru user si optiunile:
"Editează Profil" si "Panou Admin" pentru rolul de admin.

 [PASUL 5: ELEMENTE APLICATIVE ȘI MODAL. (Profil Film)]. 
    Navigați apăsând Logoul Platformei pelicula sau orice altă sursă (apasati orișice poster tip mini-imagina găsit pe platformă). Rutele dinamice de model `/movie/:id` 
 transformă întreg background-ul (folosind datele trecute în mod component). 
 -> Apăsați butonul uriaș de trailer. Remarcați efectul Z-Index Pop-in al video-ului iframe de YT.
 -> Utilizați funcțiile drepte ("Marchează Văzut") din coloana de Interacțiune Sidebar – confirmând reacțiile vizuale ale interfeței responsive.

 [PASUL 6: PLATFORMA DE ADMINISTRARE APLICATIVĂ (`/admin`)]. 
     Folosiți direct Meniul inferior sau Contul Sus-Dreapta - Navigați la "Panou Admin". Sunteți introdus în platforma Management Tab Panel.
 Încercați comutarea de state folosind Meniurile Left Sidebar (` Management Filme` față de tabul ` Actori`). Ele forțează regenerarea DOM-ului rapid. Acționați asupra oricărui 
 buton "Editează" ca să declansați componenta de alert pop-up (mocking data edition component overlay). 

 [PASUL 7: CERINȚA PAGINII SCENARIU CONTACT]. 
     Utilizați linkul Suport&Contact. Observați poziționarea corectă a celor 3 piloni academici impuși – Formular de Mesaj stilizat la perfecție pentru trimitere email, Hartă 
 Live (iFrame Google preluând perfect container-ul CSS) și Componente Funcțional de Referințare Link Extern pe Buli (Facebook, Instagram logouri curbat perfect proporționale SVG HTML).


5. INSTRUCȚIUNI TEHNICE DE COMANDĂ ȘI PORNIRE LINIARĂ 


Acest site este creat cu proces simplificat având ca fundament Node Package Manager (NPM).

 A. Dacă se predizpune analizarea codului sursă original pre-build direct pe React Vite (Dezvoltare):
    1. Dezarhivați structura completă propusă, asigurându-vă de prezența validă a NodeJS.
    2. Deschideți calea locației (unde ați generat fișierele cu `package.json`) în interiorul CMD / Terminal Bash.
    3. Rulați linia standard (generează folderele `node_modules` excluse voit din transfer arhival pt reducerea taliei zip):
       $ npm install
    4. Declanșați mecanismul server frontend:
       $ npm run dev
    5. Navigați din Web Browserul Chrome/Firefox către hostul dat (rezoluție locală minimă: `http://localhost:5173`).

 B. Analiza Structurii Complete STATICE .HTML / .CSS / .JS (Build Export):
    Alternativ, generarea `npm run build` extrage toată interactivitatea react convertindu-o fix cum este cerut într-un spațiu folder denumit `/dist`. Acolo stau fișierele direct
    vizualizabile în arhitectura de browser ce nu necesită absolut niciun protocol avariat suplimentar (pachete bundle minified HTML+CSS finale).

										
											Evaluare Placută!

