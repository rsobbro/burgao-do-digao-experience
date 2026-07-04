const app = document.querySelector("#app");
const CHEF_PASSWORD = "oHexaVem";

const hamburgueres = [
    { id: 1, nome: "Bruto do Bruxo", imagem: "assets/hamburgueres/bruto-do-bruxo.png", descricao: "Forte, intenso e cheio de magia.", categoria: "Especial" },
    { id: 2, nome: "Canarinho Clássico", imagem: "assets/hamburgueres/canarinho-classico.png", descricao: "O hambúrguer que nunca pipoca.", categoria: "Clássico" },
    { id: 3, nome: "Canarinho Fit", imagem: "assets/hamburgueres/canarinho-fit.png", descricao: "Leve, saudável e cheio de sabor.", categoria: "Fit" },
    { id: 4, nome: "Frango na Rede", imagem: "assets/hamburgueres/frango-na-rede.png", descricao: "Crocante, suculento e de dar gol.", categoria: "Frango" },
    { id: 5, nome: "Gol de Placa Smash", imagem: "assets/hamburgueres/gol-de-placa-smash.png", descricao: "Dois toques, gol certo.", categoria: "Smash" },
    { id: 6, nome: "Maracanã Fish", imagem: "assets/hamburgueres/maracana-fish.png", descricao: "Um lance de sabor que é golaço.", categoria: "Peixe" },
    { id: 7, nome: "Rei da Resenha", imagem: "assets/hamburgueres/rei-da-resenha.png", descricao: "Nobre, intenso e inesquecível.", categoria: "Premium" },
    { id: 8, nome: "Kids", imagem: "assets/hamburgueres/kids.png", descricao: "Pequeno no tamanho, gigante no sabor.", categoria: "Kids" }
];

const batatas = [
    { id: 1, nome: "Hat-Trick", imagem: "assets/batatas/hat-trick.png", descricao: "Individual • Serve 1 pessoa", categoria: "Individual" },
    { id: 2, nome: "Finalíssima", imagem: "assets/batatas/finalissima-cheddar.png", descricao: "Cheddar Artesanal • Serve 2 a 3 pessoas", categoria: "Família" },
    { id: 3, nome: "Hexa Supremo", imagem: "assets/batatas/hexa-supremo.png", descricao: "Cheddar + Bacon • Serve até 4 pessoas", categoria: "Família" },
    { id: 4, nome: "Sem batata", imagem: "", descricao: "Prefiro seguir sem batata nesta rodada.", categoria: "Opcional" }
];

const pagamentos = [
    { id: 1, nivel: "🟢 Série B", nome: "Foto Oficial", texto: "Tirar uma foto com seu Burgão e postar no grupo da família com a #BurgãoDoDigão" },
    { id: 2, nivel: "🟡 Libertadores", nome: "Influencer do Burgão", texto: "Postar no Instagram você mordendo seu Burgão com a #BurgãoDoDigão" },
    { id: 3, nivel: "🟢 Série B", nome: "Fantasia da Torcida", texto: "Tirar uma foto com alguém, ambos com um adereço na cabeça" },
    { id: 4, nivel: "🟡 Libertadores", nome: "O Maestro da Onda", texto: "Chamar a atenção de todos e pedir a OOOOOLAAAAAA \\o/\\o/\\o/" },
    { id: 5, nivel: "🔴 Champions League", nome: "O Patriota", texto: "Na hora do hino nacional, ficar de pé em frente à TV e cantar alto o hino" },
    { id: 6, nivel: "🟢 Série B", nome: "Comentarista Esportivo", texto: "Perguntar para todos ouvirem: por que o Kaká não foi escalado?" },
    { id: 7, nivel: "🟡 Libertadores", nome: "Craque do Boomerang", texto: "Fazer um boomerang imitando algum jogador e postar no grupo da família com a #BurgãoDoDigão" },
    { id: 8, nivel: "🔴 Champions League", nome: "Comemoração Histórica", texto: "Chamar alguém para fazer uma dancinha comemorando um gol e postar no Instagram com a #BurgãoDoDigão" },
    { id: 9, nivel: "⚫ Copa do Mundo", nome: "Pausa para Hidratação", texto: "Desligar a TV com 10 minutos de jogo e gritar: Pausa para hidratação!" },
    { id: 10, nivel: "⚫ Copa do Mundo", nome: "Anti-Cera", texto: "Gritar 3x durante o primeiro tempo: Neymar, levanta do chão!" }
];

const pedidoAtual = {
    tipo: "individual",
    nome: "",
    familiaNome: "",
    participantes: [],
    participanteAtualIndex: 0,
    primeiroBurger: null,
    batata: null,
    segundoBurger: null,
    pedidoEspecial: "",
    pagamento: null,
    trocasPagamento: 0
};

let tempoAtualBurger = "primeiro";

renderHome();

function renderHome() {
    app.innerHTML = `
        <section class="hero">
            <div class="hero-bg"></div>
            <div class="hero-overlay"></div>
            <div class="hero-card">
                <div class="hero-tag">🍔 Burgão do Digão Experience</div>
                <h1>BURGÃO <span>DO DIGÃO</span></h1>
                <p class="hero-subtitle">Aqui o pagamento não é em dinheiro... <strong>é na diversão!</strong></p>
                <div class="hero-info">
                    <div><span>📅 Dia</span><strong>05/07</strong></div>
                    <div><span>🕒 Concentração</span><strong>15:30</strong></div>
                </div>
                <div class="hero-features">
                    <p>🍔 Escolha seu Burgão</p>
                    <p>🎲 Descubra sua missão</p>
                    <p>🏆 Viva a Experience</p>
                </div>
                <button class="hero-button">🍔 Começar meu pedido</button>
                <button class="hero-button" style="margin-top:14px;background:rgba(255,255,255,.12);color:white;" id="btnChef">
                    👨‍🍳 Central do Chef
                </button>
                <button class="hero-button" style="margin-top:14px;background:rgba(255,255,255,.12);color:white;" id="btnPedidosSalvos">
    📤 Enviar pedidos salvos
</button>

<button class="hero-button" style="margin-top:14px;background:rgba(255,255,255,.12);color:white;" id="btnMeuPagamento">
    🎲 Seu pagamento é
</button>
            </div>
        </section>
    `;

    document.querySelector(".hero-button").addEventListener("click", renderOrderTypeScreen);
    document.querySelector("#btnChef").addEventListener("click", renderChefLogin);
    document.querySelector("#btnPedidosSalvos").addEventListener("click", renderSavedOrdersScreen);
document.querySelector("#btnMeuPagamento").addEventListener("click", renderMyPaymentsScreen);
}

function renderOrderTypeScreen() {
    app.innerHTML = `
        <section class="choice-screen">
            <div class="choice-header">
                <span>🍔 Burgão do Digão Experience</span>
                <h2>Escolha sua escalação</h2>
                <p>Antes de entrar em campo, escolha como será seu pedido.</p>
            </div>
            <div class="choice-grid">
                <button class="choice-card" data-type="individual">
                    <div class="choice-shine"></div>
                    <div class="choice-icon">🍔</div>
                    <h3>Escalação Individual</h3>
                    <p>Monte seu pedido em 3 etapas: 1º Tempo, Intervalo e 2º Tempo.</p>
                    <strong>Entrar sozinho em campo</strong>
                </button>
                <button class="choice-card" data-type="family">
                    <div class="choice-shine"></div>
                    <div class="choice-icon">👨‍👩‍👧‍👦</div>
                    <h3>Escalação da Família</h3>
                    <p>Adicione todos os participantes da família e sorteie um pagamento para cada pessoa.</p>
                    <strong>Escalar o time completo</strong>
                </button>
            </div>
        </section>
    `;

    document.querySelectorAll(".choice-card").forEach((card) => {
        card.addEventListener("click", () => {
            const type = card.dataset.type;
            pedidoAtual.tipo = type === "family" ? "familia" : "individual";

            if (type === "individual") renderIndividualNameScreen();
            if (type === "family") renderFamilyNameScreen();
        });
    });
}

function renderIndividualNameScreen() {
    app.innerHTML = `
        <section class="player-screen">
            <div class="player-card">
                <span class="player-tag">👤 Escalação Individual</span>
                <h2>Qual é o seu nome?</h2>
                <p>Informe seu nome para entrar oficialmente na Burgão do Digão Experience.</p>
                <input type="text" id="playerName" placeholder="Digite seu nome" autocomplete="off" />
                <button class="player-button">Confirmar escalação</button>
            </div>
        </section>
    `;

    document.querySelector(".player-button").addEventListener("click", () => {
        const name = document.querySelector("#playerName").value.trim();
        if (!name) {
            alert("Informe seu nome para continuar.");
            return;
        }
        pedidoAtual.nome = name;
        renderBurgerSelection("primeiro");
    });
}

function renderBurgerSelection(tempo) {
    tempoAtualBurger = tempo;
    const isPrimeiroTempo = tempo === "primeiro";

    app.innerHTML = `
        <section class="burger-screen">
            <div class="burger-header">
                <span class="player-badge"> 👤 Pedido de ${pedidoAtual.nome} </span>
                <h2>${isPrimeiroTempo ? "1º Tempo" : "2º Tempo"} <span>${isPrimeiroTempo ? "Escolha seu primeiro Burgão" : "Escolha seu segundo Burgão"}</span></h2>
                <p>${isPrimeiroTempo ? "Escolha apenas UM Burgão para abrir a partida." : "Escolha apenas UM Burgão para fechar a partida."}</p>
                <div class="selection-counter">
                    <div class="circle active"></div>
                    <div class="circle ${isPrimeiroTempo ? "" : "active"}"></div>
                </div>
            </div>
            <div class="burger-grid">${hamburgueres.map((burger) => burgerCard(burger)).join("")}</div>
        </section>
    `;

    document.querySelectorAll(".burger-select-button").forEach((button) => {
        button.addEventListener("click", () => selecionarBurger(Number(button.dataset.id)));
    });

    document.querySelectorAll(".burger-image").forEach((imageButton) => {
        imageButton.addEventListener("click", () => {
            const burgerId = Number(imageButton.dataset.previewId);
            const selectedBurger = hamburgueres.find((burger) => burger.id === burgerId);
            openBurgerPreview(selectedBurger);
        });
    });
}

function selecionarBurger(burgerId) {
    const selectedBurger = hamburgueres.find((burger) => burger.id === burgerId);
    if (!selectedBurger) return;

    if (tempoAtualBurger === "primeiro") {
        pedidoAtual.primeiroBurger = selectedBurger;

        if (pedidoAtual.tipo === "familia") {
            renderBurgerSelection("segundo");
        } else {
            renderPotatoSelection();
        }

        return;
    }

    pedidoAtual.segundoBurger = selectedBurger;

    if (pedidoAtual.tipo === "familia") {
        renderSpecialRequestScreen();
        return;
    }

    renderOrderSummary();
}

function burgerCard(burger) {
    return `
        <article class="burger-card">
            <button class="burger-image" data-preview-id="${burger.id}" title="Ver detalhes do Burgão">
                <img src="${burger.imagem}" alt="${burger.nome}">
            </button>
            <div class="burger-content">
                <span class="burger-badge">${burger.categoria}</span>
                <h3>${burger.nome}</h3>
                <p>${burger.descricao}</p>
                <button class="burger-select-button" data-id="${burger.id}">Escalar esse Burgão</button>
            </div>
        </article>
    `;
}

function openBurgerPreview(burger) {
    const modal = document.createElement("div");
    modal.className = "burger-preview-modal";
    modal.innerHTML = `
        <div class="burger-preview-content">
            <button class="burger-preview-close">×</button>
            <img src="${burger.imagem}" alt="${burger.nome}">
            <button class="burger-preview-select" data-id="${burger.id}">Escalar esse Burgão</button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".burger-preview-close").addEventListener("click", () => modal.remove());
    modal.addEventListener("click", (event) => {
        if (event.target === modal) modal.remove();
    });

    modal.querySelector(".burger-preview-select").addEventListener("click", () => {
        selecionarBurger(burger.id);
        modal.remove();
    });
}

function renderPotatoSelection() {
    const batatasDisponiveis = pedidoAtual.tipo === "individual"
        ? batatas.filter((batata) => batata.nome === "Hat-Trick" || batata.nome === "Sem batata")
        : batatas.filter((batata) => batata.nome === "Finalíssima" || batata.nome === "Hexa Supremo");

    app.innerHTML = `
        <section class="burger-screen">
            <div class="burger-header">
                <span class="player-badge">🍟 Intervalo</span>
                <h2>Escolha sua <span>batata</span></h2>
                <p>Você escalou o <strong>${pedidoAtual.primeiroBurger.nome}</strong> no 1º tempo. Agora escolha o acompanhamento do intervalo.</p>
            </div>
            <div class="burger-grid">${batatasDisponiveis.map((batata) => potatoCard(batata)).join("")}</div>
        </section>
    `;

    document.querySelectorAll(".potato-select-button").forEach((button) => {
        button.addEventListener("click", () => {
            const potatoId = Number(button.dataset.id);
            pedidoAtual.batata = batatas.find((batata) => batata.id === potatoId);
            renderHalftimeScreen();
        });
    });
}

function potatoCard(batata) {
    return `
        <article class="burger-card">
            <div class="burger-image ${batata.imagem ? "" : "no-image"}">
                ${batata.imagem ? `<img src="${batata.imagem}" alt="${batata.nome}">` : `<span>🚫🍟</span>`}
            </div>
            <div class="burger-content">
                <span class="burger-badge">${batata.categoria}</span>
                <h3>${batata.nome}</h3>
                <p>${batata.descricao}</p>
                <button class="potato-select-button" data-id="${batata.id}">Escalar no intervalo</button>
            </div>
        </article>
    `;
}

function renderHalftimeScreen() {
    app.innerHTML = `
        <section class="player-screen">
            <div class="player-card">
                <span class="player-tag">⚽ Intervalo</span>
                <h2>1º tempo encerrado!</h2>
                <p>Você já escalou:<br><br>🍔 <strong>${pedidoAtual.primeiroBurger.nome}</strong><br>🍟 <strong>${pedidoAtual.batata.nome}</strong></p>
                <button class="player-button" id="btnSegundoTempo">Iniciar 2º tempo</button>
            </div>
        </section>
    `;

    document.querySelector("#btnSegundoTempo").addEventListener("click", () => renderBurgerSelection("segundo"));
}

function renderOrderSummary() {
    app.innerHTML = `
        <section class="player-screen">
            <div class="player-card">
                <span class="player-tag">🏆 VAR do Pedido</span>
                <h2>Resumo da escalação</h2>
                <p>
                    👤 <strong>${pedidoAtual.nome}</strong><br><br>
                    ⚽ 1º Tempo:<br>🍔 ${pedidoAtual.primeiroBurger.nome}<br><br>
                    🍟 Intervalo:<br>${pedidoAtual.batata.nome}<br><br>
                    ⚽ 2º Tempo:<br>🍔 ${pedidoAtual.segundoBurger.nome}
                </p>
                <button class="player-button" id="btnPedidoEspecial">Avançar para pedido especial</button>
            </div>
        </section>
    `;

    document.querySelector("#btnPedidoEspecial").addEventListener("click", renderSpecialRequestScreen);
}

function renderSpecialRequestScreen() {
    app.innerHTML = `
        <section class="player-screen">
            <div class="player-card">
                <span class="player-tag">📝 Pedido Especial</span>
                <h2>Alguma estratégia especial?</h2>
                <p>Use este campo caso queira retirar algum ingrediente, ajustar algum Burgão ou deixar uma observação para o Chef.</p>
                <textarea id="specialRequest" placeholder="Ex.: Retirar alface do 1º Burgão, sem cebola no 2º..." rows="6" style="width: 100%; margin-top: 24px; padding: 18px; border-radius: 18px; border: 1px solid rgba(255,187,0,.35); background: rgba(255,255,255,.08); color: white; font-size: 18px; resize: vertical;"></textarea>
                <button class="player-button" id="btnMolhos">Continuar</button>
            </div>
        </section>
    `;

    document.querySelector("#btnMolhos").addEventListener("click", () => {
        pedidoAtual.pedidoEspecial = document.querySelector("#specialRequest").value.trim();
        if (pedidoAtual.tipo === "familia") {
    concluirPedidoParticipanteFamilia();
} else {
    renderSaucesScreen();
}

    });
}

function renderSaucesScreen() {
    app.innerHTML = `
        <section class="player-screen">
            <div class="player-card">
                <span class="player-tag">🥣 Molhos</span>
                <h2>Molhos disponíveis</h2>
                <p>Os molhos serão disponibilizados para acompanhar o Burgão. Não precisa escolher agora.</p>
                <p>
                    ⚽ <strong>Camisa 10</strong><br>Maionese Temperada<br><br>
                    🔥 <strong>Chute de Fora</strong><br>Barbecue Artesanal<br><br>
                    🧄 <strong>Prorrogação</strong><br>Aioli de Alho Assado<br><br>
                    🟡 <strong>VAR</strong><br>Molho Tártaro
                </p>
                <button class="player-button" id="btnFinalizarPedido">Confirmar pedido</button>
            </div>
        </section>
    `;

    document.querySelector("#btnFinalizarPedido").addEventListener("click", () => {
        if (pedidoAtual.tipo === "familia") {
    renderFamilyPreparingScreen();
} else {
    renderPreparingScreen();
}
    });
}

function sortearPagamento() {
    return pagamentos[Math.floor(Math.random() * pagamentos.length)];
}

function renderPaymentScreen() {
    const pagamento = pedidoAtual.pagamento;
    const tentativa = pedidoAtual.trocasPagamento + 1;
    const missaoDefinitiva = pedidoAtual.trocasPagamento >= 2;

    app.innerHTML = `
        <section class="player-screen">
            <div class="player-card">
                <span class="player-tag">🎰 Pagamento Sorteado</span>

                <h2>Seu pagamento será</h2>

                <p>
                    Tentativa ${tentativa} de 3
                    <br><br>
                    ${
                        missaoDefinitiva
                            ? "🏁 <strong>Missão definitiva</strong>"
                            : "Você pode aceitar ou arriscar uma troca."
                    }
                </p>

                <div style="
                    margin-top: 30px;
                    padding: 30px;
                    border-radius: 28px;
                    background: linear-gradient(145deg, rgba(242,183,5,.18), rgba(0,0,0,.85));
                    border: 2px solid rgba(242,183,5,.65);
                    box-shadow: 0 0 45px rgba(242,183,5,.22);
                    text-align: center;
                ">
                    <div style="font-size: 54px; margin-bottom: 12px;">
                        🏆
                    </div>

                    <p style="
                        font-size: 20px;
                        color: #f2b705;
                        font-weight: 900;
                        text-transform: uppercase;
                    ">
                        ${pagamento.nivel}
                    </p>

                    <h3 style="
                        font-size: 36px;
                        margin-top: 14px;
                        color: white;
                        text-transform: uppercase;
                    ">
                        ${pagamento.nome}
                    </h3>

                    <p style="
                        margin-top: 22px;
                        font-size: 20px;
                        line-height: 1.5;
                        color: rgba(255,255,255,.92);
                    ">
                        ${pagamento.texto}
                    </p>

                    <p style="
                        margin-top: 22px;
                        font-size: 13px;
                        opacity: .7;
                    ">
                        Missão #${String(pagamento.id).padStart(4, "0")}
                    </p>
                </div>

                <button class="player-button" id="btnAceitarPagamento">
                    Aceitar pagamento
                </button>

                ${
                    missaoDefinitiva
                        ? ""
                        : `
                            <button
                                class="player-button"
                                id="btnTrocarPagamento"
                                style="margin-top:14px;background:rgba(255,255,255,.12);color:white;"
                            >
                                Trocar pagamento
                            </button>
                        `
                }
            </div>
        </section>
    `;

    document.querySelector("#btnAceitarPagamento").addEventListener("click", () => {
    renderFinalConfirmation();
});

    const btnTrocar = document.querySelector("#btnTrocarPagamento");

    if (btnTrocar) {
        btnTrocar.addEventListener("click", () => {
            const ultimaChance = pedidoAtual.trocasPagamento === 1;

            const mensagem = ultimaChance
                ? "Última chance! Se trocar agora, a próxima missão será definitiva. Deseja arriscar?"
                : "Atenção! A próxima missão pode ser mais fácil... ou muito mais difícil. Deseja trocar?";

            if (!confirm(mensagem)) return;

            pedidoAtual.trocasPagamento++;
            pedidoAtual.pagamento = sortearPagamento();
            renderPaymentScreen();
        });
    }
}

function salvarPedido() {
    const pedidos = JSON.parse(localStorage.getItem("pedidosBurgao")) || [];

    const novoPedido = {
        id: Date.now(),
        data: new Date().toLocaleString("pt-BR"),
        tipo: pedidoAtual.tipo,
        status: "Recebido",

        nome: pedidoAtual.nome,
        familiaNome: pedidoAtual.familiaNome,

        primeiroBurger: pedidoAtual.primeiroBurger?.nome || "",
        batata: pedidoAtual.batata?.nome || "",
        segundoBurger: pedidoAtual.segundoBurger?.nome || "",
        pedidoEspecial: pedidoAtual.pedidoEspecial || "Nenhuma observação",

        pagamentoNivel: pedidoAtual.pagamento?.nivel || "",
        pagamentoNome: pedidoAtual.pagamento?.nome || "",
        pagamentoTexto: pedidoAtual.pagamento?.texto || "",
        trocasPagamento: pedidoAtual.trocasPagamento || 0,

        participantes: pedidoAtual.tipo === "familia"
            ? pedidoAtual.participantes.map((p) => ({
                nome: p.nome,
                primeiroBurger: p.primeiroBurger?.nome || "",
                segundoBurger: p.segundoBurger?.nome || "",
                pedidoEspecial: p.pedidoEspecial || "Nenhuma observação",
                pagamentoNivel: p.pagamento?.nivel || "",
                pagamentoNome: p.pagamento?.nome || "",
                pagamentoTexto: p.pagamento?.texto || "",
                trocasPagamento: p.trocasPagamento || 0
            }))
            : []
    };

    pedidos.push(novoPedido);
    localStorage.setItem("pedidosBurgao", JSON.stringify(pedidos));
}

function concluirPedidoParticipanteFamilia() {
    const participante = pedidoAtual.participantes[pedidoAtual.participanteAtualIndex];

    participante.primeiroBurger = pedidoAtual.primeiroBurger;
    participante.segundoBurger = pedidoAtual.segundoBurger;
    participante.pedidoEspecial = pedidoAtual.pedidoEspecial;

    pedidoAtual.participanteAtualIndex++;

    if (pedidoAtual.participanteAtualIndex < pedidoAtual.participantes.length) {
        renderNextFamilyParticipantScreen();
        return;
    }

    renderFamilyPotatoSelection();
}

    function renderFinalConfirmation() {
    salvarPedido();

    const resumoFamilia = pedidoAtual.tipo === "familia"
        ? pedidoAtual.participantes.map((participante) => `
            <div style="margin-top:20px;padding:20px;border-radius:18px;background:rgba(255,255,255,.08);border:1px solid rgba(255,187,0,.25);">
                <strong>${participante.nome}</strong>
                <br><br>
                🍔 1º Burgão:<br>${participante.primeiroBurger.nome}
                <br><br>
                🍔 2º Burgão:<br>${participante.segundoBurger.nome}
                <br><br>
                📝 Pedido Especial:<br>${participante.pedidoEspecial || "Nenhuma observação"}
                <br><br>
                💳 Pagamento:<br>
                <strong>${participante.pagamento.nivel}</strong><br>
                ${participante.pagamento.nome}<br>
                ${participante.pagamento.texto}
            </div>
        `).join("")
        : `
            <p>
                👤 <strong>${pedidoAtual.nome}</strong><br><br>
                🍔 1º Tempo:<br>${pedidoAtual.primeiroBurger.nome}<br><br>
                🍟 Intervalo:<br>${pedidoAtual.batata.nome}<br><br>
                🍔 2º Tempo:<br>${pedidoAtual.segundoBurger.nome}<br><br>
                📝 Pedido Especial:<br>${pedidoAtual.pedidoEspecial || "Nenhuma observação"}<br><br>
                💳 Seu pagamento será:<br>
                <strong>${pedidoAtual.pagamento.nivel}</strong><br>
                ${pedidoAtual.pagamento.nome}<br>
                ${pedidoAtual.pagamento.texto}
            </p>
        `;

    app.innerHTML = `
        <section class="player-screen">
            <div class="player-card" style="max-width:${pedidoAtual.tipo === "familia" ? "900px" : "560px"};">
                <span class="player-tag">🏆 Pedido Confirmado</span>

                <h2>
                    ${pedidoAtual.tipo === "familia" ? "Família escalada!" : "Você está escalado!"}
                </h2>

                ${
                    pedidoAtual.tipo === "familia"
                        ? `<p>👨‍👩‍👧‍👦 <strong>${pedidoAtual.familiaNome}</strong></p>
                           <p>🍟 Batata da família:<br><strong>${pedidoAtual.batata.nome}</strong></p>
                           ${resumoFamilia}`
                        : resumoFamilia
                }

                <button class="player-button" onclick="location.reload()">
                    Fazer novo pedido
                </button>

                <button
                    class="player-button"
                    id="btnVerChef"
                    style="margin-top:14px;background:rgba(255,255,255,.12);color:white;"
                >
                    Ver Central do Chef
                </button>
            </div>
        </section>
    `;

    document.querySelector("#btnVerChef").addEventListener("click", renderChefLogin);
}

function renderChefLogin() {
    app.innerHTML = `
        <section class="player-screen">
            <div class="player-card">
                <span class="player-tag">👨‍🍳 Área Restrita</span>

                <h2>Central do Chef</h2>

                <p>Digite a senha para acessar os pedidos.</p>

                <input
                    type="password"
                    id="chefPassword"
                    placeholder="Digite a senha"
                    autocomplete="off"
                />

                <button class="player-button" id="btnEntrarChef">
                    Entrar
                </button>

                <button
                    class="player-button"
                    id="btnVoltarInicio"
                    style="margin-top:14px;background:rgba(255,255,255,.12);color:white;"
                >
                    Voltar
                </button>
            </div>
        </section>
    `;

    const inputSenha = document.querySelector("#chefPassword");
    const btnEntrar = document.querySelector("#btnEntrarChef");
    const btnVoltar = document.querySelector("#btnVoltarInicio");

    function validarAcessoChef() {
        const senhaDigitada = inputSenha.value.trim();

        if (senhaDigitada !== CHEF_PASSWORD) {
            alert("Senha incorreta. Área exclusiva do Chef.");
            inputSenha.value = "";
            inputSenha.focus();
            return;
        }

        renderChefPanel();
    }

    btnEntrar.addEventListener("click", validarAcessoChef);

    inputSenha.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            validarAcessoChef();
        }
    });

    btnVoltar.addEventListener("click", renderHome);

    inputSenha.focus();
}

function renderChefPanel() {
    const pedidos = JSON.parse(localStorage.getItem("pedidosBurgao")) || [];

    app.innerHTML = `
        <section class="player-screen">
            <div class="player-card" style="max-width:1000px;">
                <span class="player-tag">👨‍🍳 Central do Chef</span>
                <h2>Pedidos recebidos</h2>

                <p>Total de pedidos: <strong>${pedidos.length}</strong></p>

                ${
                    pedidos.length === 0
                        ? `<p>Nenhum pedido recebido ainda.</p>`
                        : pedidos.map((pedido) => pedido.tipo === "familia"
                            ? renderChefFamilyOrder(pedido)
                            : renderChefIndividualOrder(pedido)
                        ).join("")
                }

                <button class="player-button" id="btnExportarCSV">
                    Exportar CSV
                </button>

                <button class="player-button" id="btnLimparPedidos" style="margin-top:14px;background:rgba(255,255,255,.12);color:white;">
                    Limpar pedidos
                </button>

                <button class="player-button" onclick="location.reload()" style="margin-top:14px;">
                    Voltar ao início
                </button>
            </div>
        </section>
    `;

    document.querySelector("#btnExportarCSV").addEventListener("click", exportarCSV);

    document.querySelector("#btnLimparPedidos").addEventListener("click", () => {
        if (confirm("Tem certeza que deseja apagar todos os pedidos?")) {
            localStorage.removeItem("pedidosBurgao");
            renderChefPanel();
        }
    });
}

function exportarCSV() {
    const pedidos = JSON.parse(localStorage.getItem("pedidosBurgao")) || [];

    if (pedidos.length === 0) {
        alert("Não há pedidos para exportar.");
        return;
    }

    const cabecalho = [
        "Data",
        "Tipo",
        "Nome",
        "1º Burgão",
        "Batata",
        "2º Burgão",
        "Pedido Especial",
        "Pagamento Nível",
        "Pagamento Nome",
        "Pagamento Texto",
        "Trocas"
    ];

    const linhas = pedidos.map((pedido) => [
        pedido.data,
        pedido.tipo,
        pedido.nome,
        pedido.primeiroBurger,
        pedido.batata,
        pedido.segundoBurger,
        pedido.pedidoEspecial,
        pedido.pagamentoNivel,
        pedido.pagamentoNome,
        pedido.pagamentoTexto,
        pedido.trocasPagamento
    ]);

    const csv = [cabecalho, ...linhas]
        .map((linha) => linha.map((campo) => `"${String(campo).replaceAll('"', '""')}"`).join(";"))
        .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "pedidos-burgao-do-digao.csv";
    link.click();

    URL.revokeObjectURL(url);
}

function renderPreparingScreen() {
    app.innerHTML = `
        <section class="player-screen">
            <div class="player-card">
                <span class="player-tag">👨‍🍳 Cozinha do Chef</span>

                <h2>Preparando seu pedido...</h2>

                <p id="preparingText">
                    🍔 Escolhendo o melhor pão...
                </p>

                <div style="
                    width:100%;
                    height:18px;
                    margin-top:28px;
                    border-radius:999px;
                    background:rgba(255,255,255,.12);
                    overflow:hidden;
                ">
                    <div id="preparingBar" style="
                        width:0%;
                        height:100%;
                        background:#f2b705;
                        border-radius:999px;
                        transition:.8s;
                    "></div>
                </div>

                <p id="preparingPercent" style="margin-top:18px;">
                    0%
                </p>
            </div>
        </section>
    `;

    const steps = [
        { text: "🍔 Escolhendo o melhor pão...", percent: 25 },
        { text: "🥩 Grelhando a carne...", percent: 50 },
        { text: "🧀 Derretendo o cheddar...", percent: 75 },
        { text: "🎲 Sorteando seu pagamento...", percent: 100 }
    ];

    let index = 0;

    const interval = setInterval(() => {
        const step = steps[index];

        document.querySelector("#preparingText").innerHTML = step.text;
        document.querySelector("#preparingBar").style.width = `${step.percent}%`;
        document.querySelector("#preparingPercent").innerHTML = `${step.percent}%`;

        index++;

        if (index === steps.length) {
            clearInterval(interval);

            setTimeout(() => {
                pedidoAtual.pagamento = sortearPagamento();
                pedidoAtual.trocasPagamento = 0;
                renderPaymentScreen();
            }, 1000);
        }
    }, 1200);
}

function renderFamilyNameScreen() {
    app.innerHTML = `
        <section class="player-screen">
            <div class="player-card">
                <span class="player-tag">👨‍👩‍👧‍👦 Escalação da Família</span>

                <h2>Nome da família</h2>

                <p>
                    Informe o nome da família ou do time que participará da
                    Burgão do Digão Experience.
                </p>

                <input
                    type="text"
                    id="familyName"
                    placeholder="Ex.: Família Oliveira"
                    autocomplete="off"
                />

                <button class="player-button" id="btnFamilyName">
                    Continuar
                </button>
            </div>
        </section>
    `;

    document.querySelector("#btnFamilyName").addEventListener("click", () => {
        const familyName = document.querySelector("#familyName").value.trim();

        if (!familyName) {
            alert("Informe o nome da família para continuar.");
            return;
        }

        pedidoAtual.familiaNome = familyName;
        pedidoAtual.participantes = [];

        renderFamilyParticipantsScreen();
    });
}

function renderFamilyParticipantsScreen() {
    app.innerHTML = `
        <section class="player-screen">
            <div class="player-card">
                <span class="player-tag">⚽ Escalação do Time</span>

                <h2>Quem vai participar?</h2>

                <p>
                    Adicione os nomes das pessoas que farão parte do pedido da família.
                </p>

                <input
                    type="text"
                    id="participantName"
                    placeholder="Nome do participante"
                    autocomplete="off"
                />

                <button class="player-button" id="btnAddParticipant">
                    + Adicionar participante
                </button>

                <div id="participantsList" style="margin-top:24px;"></div>

                <button
                    class="player-button"
                    id="btnStartFamilyOrder"
                    style="margin-top:24px;background:rgba(255,255,255,.12);color:white;"
                >
                    Iniciar pedidos da família
                </button>
            </div>
        </section>
    `;

    atualizarListaParticipantes();

    document.querySelector("#btnAddParticipant").addEventListener("click", () => {
        const input = document.querySelector("#participantName");
        const name = input.value.trim();

        if (!name) {
            alert("Informe o nome do participante.");
            return;
        }

        pedidoAtual.participantes.push({
            nome: name,
            primeiroBurger: null,
            batata: null,
            segundoBurger: null,
            pedidoEspecial: "",
            pagamento: null,
            trocasPagamento: 0
        });

        input.value = "";
        atualizarListaParticipantes();
    });

    document.querySelector("#btnStartFamilyOrder").addEventListener("click", () => {
        if (pedidoAtual.participantes.length === 0) {
            alert("Adicione pelo menos um participante.");
            return;
        }

        pedidoAtual.participanteAtualIndex = 0;

        iniciarPedidoParticipanteFamilia();
    });
}

function atualizarListaParticipantes() {
    const list = document.querySelector("#participantsList");

    if (!list) return;

    if (pedidoAtual.participantes.length === 0) {
        list.innerHTML = `<p>Nenhum participante adicionado ainda.</p>`;
        return;
    }

    list.innerHTML = pedidoAtual.participantes.map((participante, index) => `
        <div style="
            margin-top:12px;
            padding:14px;
            border-radius:14px;
            background:rgba(255,255,255,.08);
            border:1px solid rgba(255,187,0,.22);
        ">
            ${index + 1}. ${participante.nome}
        </div>
    `).join("");
}

function iniciarPedidoParticipanteFamilia() {
    const participante = pedidoAtual.participantes[pedidoAtual.participanteAtualIndex];

    pedidoAtual.nome = participante.nome;
    pedidoAtual.primeiroBurger = null;
    pedidoAtual.batata = null;
    pedidoAtual.segundoBurger = null;
    pedidoAtual.pedidoEspecial = "";
    pedidoAtual.pagamento = null;
    pedidoAtual.trocasPagamento = 0;

    renderBurgerSelection("primeiro");
}

function concluirPedidoParticipanteFamilia() {
    const participante = pedidoAtual.participantes[pedidoAtual.participanteAtualIndex];

    participante.primeiroBurger = pedidoAtual.primeiroBurger;
    participante.segundoBurger = pedidoAtual.segundoBurger;
    participante.pedidoEspecial = pedidoAtual.pedidoEspecial;

    pedidoAtual.participanteAtualIndex++;

    if (pedidoAtual.participanteAtualIndex < pedidoAtual.participantes.length) {
        renderNextFamilyParticipantScreen();
        return;
    }

    renderFamilyPotatoSelection();
}

function renderNextFamilyParticipantScreen() {
    const participante = pedidoAtual.participantes[pedidoAtual.participanteAtualIndex];

    app.innerHTML = `
        <section class="player-screen">
            <div class="player-card">
                <span class="player-tag">👨‍👩‍👧‍👦 Modo Família</span>

                <h2>Agora é a vez de ${participante.nome}</h2>

                <p>
                    O próximo participante vai escolher seus 2 Burgões.
                </p>

                <button class="player-button" id="btnProximoParticipante">
                    Começar pedido de ${participante.nome}
                </button>
            </div>
        </section>
    `;

    document.querySelector("#btnProximoParticipante").addEventListener("click", () => {
        iniciarPedidoParticipanteFamilia();
    });
}

function renderFamilyPotatoSelection() {
    const batatasFamilia = batatas.filter((batata) =>
        batata.nome === "Finalíssima" || batata.nome === "Hexa Supremo"
    );

    app.innerHTML = `
        <section class="burger-screen">
            <div class="burger-header">
                <span class="player-badge">🍟 Batata da Família</span>

                <h2>
                    Escolha a batata
                    <span>da família</span>
                </h2>

                <p>
                    Agora escolha uma única batata para toda a família.
                </p>
            </div>

            <div class="burger-grid">
                ${batatasFamilia.map((batata) => potatoCard(batata)).join("")}
            </div>
        </section>
    `;

    document.querySelectorAll(".potato-select-button").forEach((button) => {
        button.addEventListener("click", () => {
            const potatoId = Number(button.dataset.id);
            pedidoAtual.batata = batatas.find((batata) => batata.id === potatoId);

            renderSaucesScreen();
        });
    });
}

function renderFamilyPreparingScreen() {
    app.innerHTML = `
        <section class="player-screen">
            <div class="player-card">
                <span class="player-tag">👨‍🍳 Cozinha da Família</span>

                <h2>Preparando todos os pedidos...</h2>

                <p id="preparingText">
                    🍔 Organizando a escalação da família...
                </p>

                <div style="
                    width:100%;
                    height:18px;
                    margin-top:28px;
                    border-radius:999px;
                    background:rgba(255,255,255,.12);
                    overflow:hidden;
                ">
                    <div id="preparingBar" style="
                        width:0%;
                        height:100%;
                        background:#f2b705;
                        border-radius:999px;
                        transition:.8s;
                    "></div>
                </div>

                <p id="preparingPercent" style="margin-top:18px;">
                    0%
                </p>
            </div>
        </section>
    `;

    const steps = [
        { text: "🍔 Conferindo os Burgões da família...", percent: 25 },
        { text: "🍟 Separando a batata da família...", percent: 50 },
        { text: "🥣 Preparando os molhos...", percent: 75 },
        { text: "🎲 Iniciando sorteio das missões...", percent: 100 }
    ];

    let index = 0;

    const interval = setInterval(() => {
        const step = steps[index];

        document.querySelector("#preparingText").innerHTML = step.text;
        document.querySelector("#preparingBar").style.width = `${step.percent}%`;
        document.querySelector("#preparingPercent").innerHTML = `${step.percent}%`;

        index++;

        if (index === steps.length) {
            clearInterval(interval);

            setTimeout(() => {
                pedidoAtual.participanteAtualIndex = 0;
                iniciarSorteioMissaoFamilia();
            }, 1000);
        }
    }, 1200);
}

function iniciarSorteioMissaoFamilia() {
    const participante = pedidoAtual.participantes[pedidoAtual.participanteAtualIndex];

    participante.pagamento = sortearPagamento();
    participante.trocasPagamento = 0;

    renderFamilyPaymentScreen();
}

function renderFamilyPaymentScreen() {
    const participante = pedidoAtual.participantes[pedidoAtual.participanteAtualIndex];
    const pagamento = participante.pagamento;
    const tentativa = participante.trocasPagamento + 1;
    const missaoDefinitiva = participante.trocasPagamento >= 2;

    app.innerHTML = `
        <section class="player-screen">
            <div class="player-card">
                <span class="player-tag">🎰 Missão da Família</span>

                <h2>Missão de ${participante.nome}</h2>

                <p>
                    Tentativa ${tentativa} de 3
                    <br><br>
                    ${
                        missaoDefinitiva
                            ? "🏁 <strong>Missão definitiva</strong>"
                            : "Pode aceitar ou arriscar uma troca."
                    }
                </p>

                <div style="
                    margin-top:30px;
                    padding:30px;
                    border-radius:28px;
                    background:linear-gradient(145deg, rgba(242,183,5,.18), rgba(0,0,0,.85));
                    border:2px solid rgba(242,183,5,.65);
                    box-shadow:0 0 45px rgba(242,183,5,.22);
                    text-align:center;
                ">
                    <div style="font-size:54px;margin-bottom:12px;">🏆</div>

                    <p style="font-size:20px;color:#f2b705;font-weight:900;text-transform:uppercase;">
                        ${pagamento.nivel}
                    </p>

                    <h3 style="font-size:36px;margin-top:14px;color:white;text-transform:uppercase;">
                        ${pagamento.nome}
                    </h3>

                    <p style="margin-top:22px;font-size:20px;line-height:1.5;color:rgba(255,255,255,.92);">
                        ${pagamento.texto}
                    </p>
                </div>

                <button class="player-button" id="btnAceitarMissaoFamilia">
                    Aceitar missão
                </button>

                ${
                    missaoDefinitiva
                        ? ""
                        : `
                            <button
                                class="player-button"
                                id="btnTrocarMissaoFamilia"
                                style="margin-top:14px;background:rgba(255,255,255,.12);color:white;"
                            >
                                Trocar missão
                            </button>
                        `
                }
            </div>
        </section>
    `;

    document.querySelector("#btnAceitarMissaoFamilia").addEventListener("click", () => {
        pedidoAtual.participanteAtualIndex++;

        if (pedidoAtual.participanteAtualIndex < pedidoAtual.participantes.length) {
            iniciarSorteioMissaoFamilia();
            return;
        }

        renderFinalConfirmation();
    });

    const btnTrocar = document.querySelector("#btnTrocarMissaoFamilia");

    if (btnTrocar) {
        btnTrocar.addEventListener("click", () => {
            const ultimaChance = participante.trocasPagamento === 1;

            const mensagem = ultimaChance
                ? "Última chance! Se trocar agora, a próxima missão será definitiva. Deseja arriscar?"
                : "Atenção! A próxima missão pode ser mais fácil... ou muito mais difícil. Deseja trocar?";

            if (!confirm(mensagem)) return;

            participante.trocasPagamento++;
            participante.pagamento = sortearPagamento();

            renderFamilyPaymentScreen();
        });
    }
}

function renderChefIndividualOrder(pedido) {
    return `
        <div style="margin-top:20px;padding:22px;border-radius:20px;background:rgba(255,255,255,.08);border:1px solid rgba(255,187,0,.25);">
            <strong>👤 ${pedido.nome}</strong><br>
            ${pedido.data}<br>
            Status: 🟡 ${pedido.status || "Recebido"}<br><br>

            🍔 1º Tempo: ${pedido.primeiroBurger}<br>
            🍟 Intervalo: ${pedido.batata}<br>
            🍔 2º Tempo: ${pedido.segundoBurger}<br>
            📝 Especial: ${pedido.pedidoEspecial}<br><br>

            💳 ${pedido.pagamentoNivel}<br>
            ${pedido.pagamentoNome}<br>
            ${pedido.pagamentoTexto}
        </div>
    `;
}

function renderChefFamilyOrder(pedido) {
    return `
        <div style="margin-top:26px;padding:24px;border-radius:22px;background:rgba(255,255,255,.08);border:1px solid rgba(255,187,0,.35);">
            <strong>👨‍👩‍👧‍👦 ${pedido.familiaNome}</strong><br>
            ${pedido.data}<br>
            Status: 🟡 ${pedido.status || "Recebido"}<br>
            Participantes: ${pedido.participantes.length}<br>
            🍟 Batata da família: ${pedido.batata}<br><br>

            ${pedido.participantes.map((p) => `
                <div style="margin-top:16px;padding:16px;border-radius:16px;background:rgba(0,0,0,.25);">
                    <strong>👤 ${p.nome}</strong><br><br>
                    🍔 1º Burgão: ${p.primeiroBurger}<br>
                    🍔 2º Burgão: ${p.segundoBurger}<br>
                    📝 Especial: ${p.pedidoEspecial}<br><br>
                    💳 ${p.pagamentoNivel}<br>
                    ${p.pagamentoNome}<br>
                    ${p.pagamentoTexto}
                </div>
            `).join("")}
        </div>
    `;
}

function renderSavedOrdersScreen() {
    const pedidos = JSON.parse(localStorage.getItem("pedidosBurgao")) || [];

    app.innerHTML = `
        <section class="player-screen">
            <div class="player-card" style="max-width:900px;">
                <span class="player-tag">📤 Pedidos Salvos</span>

                <h2>Pedidos encontrados neste dispositivo</h2>

                ${
                    pedidos.length === 0
                        ? `<p>Nenhum pedido salvo foi encontrado neste navegador.</p>`
                        : `
                            <p>
                                Encontramos <strong>${pedidos.length}</strong> pedido(s) salvo(s).
                            </p>

                            ${pedidos.map((pedido, index) => `
                                <div style="margin-top:20px;padding:20px;border-radius:18px;background:rgba(255,255,255,.08);border:1px solid rgba(255,187,0,.25);">
                                    <strong>${index + 1}. ${pedido.tipo === "familia" ? pedido.familiaNome : pedido.nome}</strong><br>
                                    ${pedido.data}<br><br>

                                    ${
                                        pedido.tipo === "familia"
                                            ? `
                                                👨‍👩‍👧‍👦 Pedido Família<br>
                                                🍟 Batata: ${pedido.batata}<br>
                                                Participantes: ${pedido.participantes?.length || 0}
                                            `
                                            : `
                                                👤 Pedido Individual<br>
                                                🍔 1º Burgão: ${pedido.primeiroBurger}<br>
                                                🍟 Batata: ${pedido.batata}<br>
                                                🍔 2º Burgão: ${pedido.segundoBurger}<br>
                                                📝 Especial: ${pedido.pedidoEspecial}
                                            `
                                    }
                                </div>
                            `).join("")}

                            <button class="player-button" id="btnEnviarPedidos">
                                Enviar pedidos para o Chef
                            </button>
                        `
                }

                <button class="player-button" id="btnVoltarHome" style="margin-top:14px;background:rgba(255,255,255,.12);color:white;">
                    Voltar
                </button>
            </div>
        </section>
    `;

    const btnEnviar = document.querySelector("#btnEnviarPedidos");

    if (btnEnviar) {
        btnEnviar.addEventListener("click", () => {
            enviarPedidosParaFirestore(pedidos);
        });
    }

    document.querySelector("#btnVoltarHome").addEventListener("click", renderHome);
}

function renderMyPaymentsScreen() {
    const pedidos = JSON.parse(localStorage.getItem("pedidosBurgao")) || [];

    app.innerHTML = `
        <section class="player-screen">
            <div class="player-card" style="max-width:900px;">
                <span class="player-tag">🎲 Seu pagamento é</span>

                <h2>Missões salvas neste dispositivo</h2>

                ${
                    pedidos.length === 0
                        ? `<p>Nenhuma missão encontrada neste navegador.</p>`
                        : pedidos.map((pedido) => `
                            <div style="margin-top:20px;padding:20px;border-radius:18px;background:rgba(255,255,255,.08);border:1px solid rgba(255,187,0,.25);">
                                ${
                                    pedido.tipo === "familia"
                                        ? `
                                            <strong>👨‍👩‍👧‍👦 ${pedido.familiaNome}</strong><br><br>

                                            ${pedido.participantes.map((p) => `
                                                <div style="margin-top:14px;padding:14px;border-radius:14px;background:rgba(0,0,0,.25);">
                                                    👤 <strong>${p.nome}</strong><br><br>
                                                    💳 <strong>${p.pagamentoNivel}</strong><br>
                                                    ${p.pagamentoNome}<br>
                                                    ${p.pagamentoTexto}
                                                </div>
                                            `).join("")}
                                        `
                                        : `
                                            👤 <strong>${pedido.nome}</strong><br><br>
                                            💳 <strong>${pedido.pagamentoNivel}</strong><br>
                                            ${pedido.pagamentoNome}<br>
                                            ${pedido.pagamentoTexto}
                                        `
                                }
                            </div>
                        `).join("")
                }

                <button class="player-button" id="btnVoltarHome" style="margin-top:24px;">
                    Voltar
                </button>
            </div>
        </section>
    `;

    document.querySelector("#btnVoltarHome").addEventListener("click", renderHome);
}