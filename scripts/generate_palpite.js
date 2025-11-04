// scripts/generate_palpite.js
const fs = require('fs');
const path = require('path');

// Mapeamento dos grupos e suas 4 dezenas (padrao do Jogo do Bicho)
const grupos = [
  { grupo: 1, nome: "Avestruz", dezenas: ["01","02","03","04"] },
  { grupo: 2, nome: "Águia", dezenas: ["05","06","07","08"] },
  { grupo: 3, nome: "Burro", dezenas: ["09","10","11","12"] },
  { grupo: 4, nome: "Borboleta", dezenas: ["13","14","15","16"] },
  { grupo: 5, nome: "Cachorro", dezenas: ["17","18","19","20"] },
  { grupo: 6, nome: "Cabra", dezenas: ["21","22","23","24"] },
  { grupo: 7, nome: "Carneiro", dezenas: ["25","26","27","28"] },
  { grupo: 8, nome: "Camelo", dezenas: ["29","30","31","32"] },
  { grupo: 9, nome: "Cobra", dezenas: ["33","34","35","36"] },
  { grupo:10, nome: "Coelho", dezenas: ["37","38","39","40"] },
  { grupo:11, nome: "Cavalo", dezenas: ["41","42","43","44"] },
  { grupo:12, nome: "Elefante", dezenas: ["45","46","47","48"] },
  { grupo:13, nome: "Galo", dezenas: ["49","50","51","52"] },
  { grupo:14, nome: "Gato", dezenas: ["53","54","55","56"] },
  { grupo:15, nome: "Jacaré", dezenas: ["57","58","59","60"] },
  { grupo:16, nome: "Leão", dezenas: ["61","62","63","64"] },
  { grupo:17, nome: "Macaco", dezenas: ["65","66","67","68"] },
  { grupo:18, nome: "Porco", dezenas: ["69","70","71","72"] },
  { grupo:19, nome: "Pavão", dezenas: ["73","74","75","76"] },
  { grupo:20, nome: "Peru", dezenas: ["77","78","79","80"] },
  { grupo:21, nome: "Touro", dezenas: ["81","82","83","84"] },
  { grupo:22, nome: "Tigre", dezenas: ["85","86","87","88"] },
  { grupo:23, nome: "Urso", dezenas: ["89","90","91","92"] },
  { grupo:24, nome: "Veado", dezenas: ["93","94","95","96"] },
  { grupo:25, nome: "Vaca", dezenas: ["97","98","99","00"] }
];

function randInt(max){ return Math.floor(Math.random()*max); }

function escolherBichos(qtd){
  const copia = [...grupos];
  const escolhidos = [];
  while(escolhidos.length < qtd && copia.length){
    const i = randInt(copia.length);
    escolhidos.push(copia.splice(i,1)[0]);
  }
  return escolhidos;
}

// Gera 5 milhares para um bicho: concatena duas dezenas escolhidas aleatoriamente do conjunto de 4 dezenas do bicho
function gerarMilharesParaBicho(bicho, qtd=5){
  const milhares = new Set();
  const dezenas = bicho.dezenas;
  while(milhares.size < qtd){
    const dez1 = dezenas[randInt(dezenas.length)];
    const dez2 = dezenas[randInt(dezenas.length)];
    // milhar é dez1 + dez2 (ex: "15" + "23" => "1523")
    const milhar = (dez1 + dez2).replace(/^0+/, function(m){ return m.length===2 ? "0" : ""; });
    // garantir 4 dígitos (ex: '00' + '97' -> '0097' é aceito)
    const formatado = milhar.padStart(4, '0');
    milhares.add(formatado);
  }
  return Array.from(milhares);
}

function gerarPaginaHtml(dataISO, palpites, siteTitle = "Imperador da Sorte JB"){
  const dateStr = dataISO;
  const title = `Palpites Jogo do Bicho — ${siteTitle} — ${dateStr}`;
  const css = `
    body{background:#0b0b0b;color:#f2d26b;font-family:Arial,Helvetica,sans-serif;margin:0;padding:0;}
    .top{background:linear-gradient(90deg,#111 0%,#0b0b0b 100%);padding:18px 24px;display:flex;align-items:center;gap:14px}
    .logo{width:56px;height:56px;object-fit:contain;border-radius:8px}
    .container{max-width:960px;margin:32px auto;padding:20px;background:rgba(255,255,255,0.02);border-radius:12px;box-shadow:0 6px 30px rgba(0,0,0,0.6)}
    h1{margin:0 0 8px;font-size:22px}
    .meta{color:#e6c97a;margin-bottom:18px}
    .bicho{background:rgba(242,210,107,0.06);padding:12px;border-radius:8px;margin-bottom:10px}
    .milhares{font-weight:700;font-size:18px}
    footer{margin-top:20px;color:#b59b4d;font-size:13px}
  `;

  const rows = palpites.map(p => {
    const mils = p.milhares.join(' / ');
    return `
    <div class="bicho">
      <div><strong># Grupo ${p.grupo} — ${p.nome}</strong></div>
      <div class="milhares">${mils}</div>
    </div>`;
  }).join('\n');

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${title}</title>
<style>${css}</style>
</head>
<body>
  <div class="top">
    <img src="/icon.webp" class="logo" alt="Logo" />
    <div>
      <div style="font-size:18px;font-weight:700">${siteTitle}</div>
      <div style="color:#b59b4d;font-size:13px">Palpites diários — ${dateStr}</div>
    </div>
  </div>

  <main class="container">
    <h1>Palpites para o dia ${dateStr}</h1>
    <div class="meta">4 Bichos — 5 milhares por bicho — Total de 20 milhares</div>

    ${rows}

    <footer>Canal: Imperador da Sorte JB — bancabrasileirabet.com.br</footer>
  </main>
</body>
</html>`;
}

function main(){
  const hoje = new Date();
  // format yyyy-mm-dd
  const yyyy = hoje.getFullYear();
  const mm = String(hoje.getMonth()+1).padStart(2,'0');
  const dd = String(hoje.getDate()).padStart(2,'0');
  const dateISO = `${dd}-${mm}-${yyyy}`; // formato que você pediu anteriormente

  // escolher 4 bichos aleatórios
  const bichos = escolherBichos(4);

  const palpites = bichos.map(b => {
    return {
      grupo: b.grupo,
      nome: b.nome,
      milhares: gerarMilharesParaBicho(b,5)
    };
  });

  // caminho da pasta palpites
  const dir = path.join(process.cwd(), 'palpites');
  if(!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const filename = path.join(dir, `${dateISO}.html`);
  const html = gerarPaginaHtml(dateISO, palpites, "Imperador da Sorte JB");
  fs.writeFileSync(filename, html, 'utf8');

  console.log('Página gerada:', filename);
  console.log(JSON.stringify(palpites, null, 2));
}

main();
