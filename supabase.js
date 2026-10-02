const SUPABASE_URL = "https://mblzgqhrrckrkdrjvemt.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_gnrYj7Y-JGXLb4oAwybkVw_EoCAnXZQ";

async function testarSupabase() {

    try {

        const resposta = await fetch(
            SUPABASE_URL + "/rest/v1/alunos?select=*",
            {
                method: "GET",

                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization":
                        "Bearer " + SUPABASE_KEY
                }
            }
        );


        if (!resposta.ok) {

            throw new Error(
                "Erro HTTP: " +
                resposta.status
            );

        }


        const alunos =
            await resposta.json();


        console.log(
            "Supabase conectado!",
            alunos
        );


    } catch (erro) {

        console.error(
            "Erro ao conectar ao Supabase:",
            erro
        );

    }

}