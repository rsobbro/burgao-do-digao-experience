async function enviarPedidosParaFirestore(pedidos) {
    if (!pedidos || pedidos.length === 0) {
        alert("Nenhum pedido local encontrado para enviar.");
        return;
    }

    try {
        let enviados = 0;

        for (const pedido of pedidos) {
            const pedidoOnline = {
                ...pedido,
                status: pedido.status || "Recebido",
                origem: "localStorage",
                versao: "1.0",
                enviadoEm: new Date().toISOString(),
                sincronizado: true
            };

            await db.collection("pedidos").add(pedidoOnline);

            enviados++;
        }

        alert(`${enviados} pedido(s) enviado(s) com sucesso para o Chef!`);
    } catch (error) {
        console.error("Erro ao enviar pedidos para o Firestore:", error);
        alert("Erro ao enviar pedidos. Verifique o Console do navegador.");
    }
}

async function buscarPedidosFirestore() {

    try {

        const snapshot = await db
            .collection("pedidos")
            .orderBy("enviadoEm", "desc")
            .get();

        return snapshot.docs.map(doc => ({
            idFirestore: doc.id,
            ...doc.data()
        }));

    } catch (error) {

        console.error(error);

        alert("Erro ao carregar pedidos do Firebase.");

        return [];

    }

}