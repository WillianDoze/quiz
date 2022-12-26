/* Variaveis de controle do nosso jogo */


let pergfeitas = []

//Perguntas do jogo
const perguntas = [
    {
        perguntas: "Qual dessas linguagens não é considerada uma linguagem de programação?",
        respostas: ["PHP", "JavaScript", "C++", "HTML"],
        correta: "resp3"
    }, 
    {
        perguntas: "Qual pais ganhou mais copa do mundo?",
        respostas: ["Brasil", "Holanda", "França", "Argentina"],
        correta: "resp0"
    },
    {
        perguntas: "Quando o Brasil foi descoberto?",
        respostas: ["Quando tiraram o cobertor", "1500", "Nunca foi", "1657"],
        correta: "resp1"
    },
    {
        perguntas: "Quantas vezes o Brasil foi campeão do mundo?",
        respostas: ["Cinco(5)", "Seis(6)", "Oito(8)", "Quatro(4)"],
        correta: "resp0"
    },
]
var qtdPerguntas = perguntas.length - 1;

gerarPerguntas(qtdPerguntas)

function gerarPerguntas(maxPerguntas){
    let aleatorio = (Math.random()* maxPerguntas).toFixed()
    aleatorio = Number(aleatorio)
    
    if(!pergfeitas.includes(aleatorio)){
        pergfeitas.push(aleatorio)

        var p_selecionada = perguntas[aleatorio].perguntas;
        console.log(p_selecionada)

        //Pergunta vinda do sorteio
        $("#pergunta").html(p_selecionada)
        $("#pergunta").attr("data-indice", aleatorio)

        //Respostas

        for (var i=0; i<4; i++){
            $("#resp" + i).html(perguntas[aleatorio].respostas[i])
        }

        /*var resp0 = perguntas[aleatorio].respostas[0]
        //var resp1 = perguntas[aleatorio].respostas[1]
        //var resp2 = perguntas[aleatorio].respostas[2]
        //var resp3 = perguntas[aleatorio].respostas[3]

        //$("#resp0").html(resp3)
        //$("#resp1").html(resp0)
        //$("#resp2").html(resp1)
        //$("#resp3").html(resp0)
    */
        //Embaralhar as respostas
        var container = $("#resposta");
        var botoes = container.children()
        
        for(var i = 1; i < botoes.length;i++){
            container.append(botoes.eq(Math.floor(Math.random() * botoes.length)))
        }
    }else{
        console.log("A pergunta já foi feita. Sorteando nova pergunta....")
        if(pergfeitas.length < qtdPerguntas +1) {
            return gerarPerguntas(maxPerguntas)
        }else{
            console.log("Acabaram as perguntas!")
            function gameOver(){
                $("#quiz").addClass("oculto")
                $("#mensagem").html("Parabéns você acertou todas!!!")
                $("#status").removeClass("oculto")
            }
         }
    }
}

$('.resposta').click(function(){
    if($("#quiz").attr('data-status')!=='travado'){
    resetaBotoes();

    $(this).addClass('selecionada')
    }
});

$("#confirm").click(function(){
    var indice = $("#pergunta").attr("data-indice")

    //Qual a respostas certa

    var respCerta = perguntas[indice].correta

    $('.resposta').each(function(){
        if($(this).hasClass('selecionada')){
            var respostaEscolhida = $(this).attr('id')

            if(respCerta == respostaEscolhida){
                alert('Acertoooou')
                proximapergunta()
            }else{
                console.log('Errooooouuu!!!')
                $("#quiz").attr('data-status', 'travado')
                $("#confirm").addClass('oculto')
                $("#" + respCerta).addClass("correta");
                $("#" + respostaEscolhida).removeClass("selecionada");
                $("#" + respostaEscolhida).addClass("selecionada");
                setTimeout(function(){
                    gameOver()
                }, 3500)
            }
        }
    })
});

function newGame(){
    $("#confirm").removeClass('oculto')
    $("#quiz").attr('data-status', 'ok');
    pergfeitas = []
    resetaBotoes()
    gerarPerguntas(qtdPerguntas)
    $("#quiz").removeClass("oculto")
    $("#status").addClass("oculto")
}

function proximapergunta(){

    resetaBotoes()
    gerarPerguntas(qtdPerguntas)
}

function resetaBotoes(){
    $('.resposta').each(function(){
        if($(this).hasClass('selecionada')){
            $(this).removeClass('selecionada')
        }
        if($(this).hasClass('correta')){
            $(this).removeClass('correta')
        }
        if($(this).hasClass('errada')){
            $(this).removeClass('errada')
        }
        
    });
}
function gameOver(){
    $("#quiz").addClass("oculto")
    $("#mensagem").html("Game Over")
    $("#status").removeClass("oculto")
}

$('#novoJogo').click(function(){
    newGame();
});

