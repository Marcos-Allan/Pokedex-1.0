let menu = document.querySelector("#menu")
let tela = document.querySelector("#tela-principal")

let altura_menu = menu.clientHeight

let input_search = document.querySelector("#input_search")
let btn_pesq = document.querySelector("#btn")

let toggle_Theme = [...document.querySelectorAll(".toggle_Theme")]
let added = "" 

const div_principal = document.querySelector('#primary')

tela.style.marginTop= `${altura_menu}px`

setInterval(() => {
    let largura = window.screen.width
    
    if (largura >= 576) {
        input_search.classList.add("w-auto")
    } else {
        input_search.classList.remove("w-auto")
        input_search.classList.add("w-100")
    }
}, 1);

toggle_Theme.map((el, i) => {
    el.addEventListener('click', () => {
        if(toggle_Theme[i].classList.contains("bi-sun-fill")){     
            toggle_Theme[0].classList.remove('bi-sun-fill')
            toggle_Theme[0].classList.add('bi-moon-fill')
            toggle_Theme[1].classList.remove('bi-sun-fill')
            toggle_Theme[1].classList.add('bi-moon-fill')
        }else{
            toggle_Theme[0].classList.remove('bi-moon-fill')
            toggle_Theme[0].classList.add('bi-sun-fill')
            toggle_Theme[1].classList.remove('bi-moon-fill')
            toggle_Theme[1].classList.add('bi-sun-fill')
        }
    })
})
/*
toggle_Theme[0].addEventListener('click', () =>{
    if(toggle_Theme[0].classList.contains("bi-sun-fill")){
        
        toggle_Theme[0].classList.remove('bi-sun-fill')
        toggle_Theme[0].classList.add('bi-moon-fill')
        toggle_Theme[1].classList.remove('bi-sun-fill')
        toggle_Theme[1].classList.add('bi-moon-fill')

    }else{
        
        toggle_Theme[0].classList.remove('bi-moon-fill')
        toggle_Theme[0].classList.add('bi-sun-fill')
        toggle_Theme[1].classList.remove('bi-moon-fill')
        toggle_Theme[1].classList.add('bi-sun-fill')
        
    }

})

toggle_Theme[1].addEventListener('click', () =>{
    if(toggle_Theme[1].classList.contains("bi-sun-fill")){
        
        toggle_Theme[1].classList.remove('bi-sun-fill')
        toggle_Theme[1].classList.add('bi-moon-fill')
        toggle_Theme[0].classList.remove('bi-sun-fill')
        toggle_Theme[0].classList.add('bi-moon-fill')

    }else{
        
        toggle_Theme[1].classList.remove('bi-moon-fill')
        toggle_Theme[1].classList.add('bi-sun-fill')
        toggle_Theme[0].classList.remove('bi-moon-fill')
        toggle_Theme[0].classList.add('bi-sun-fill')
        
    }

})
*/

const div_pkms = document.querySelector('#row')

const pokeball_icon = document.querySelector("#img-pokeball")

const ind = 0

let pkmon_number = 1

const types = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy']

const cores = ['#A8A77A', '#EE8130', '#6390F0', '#F7D02C', '#7AC74C', '#96D9D6', '#C22E28', '#A33EA1', '#E2BF65', '#A98FF3', '#F95587', '#A6B91A', '#B6A136', '#735797', '#6F35FC', '#705746', '#B7B7CE', '#D685AD'] 

let cmc_gen_fim_1 = [1, 151]
let cmc_gen_fim_2 = [152, 251]
let cmc_gen_fim_3 = [252, 386]

let pd_del = true

const loading_icon = document.querySelector("#loading_icon")

function pokedex_1(cmc, fim) {
    limparResultados()    
    pkmon_number = cmc

    async function api(cmc, fim){

        pd_del = false
        
        for (let index = cmc; index <= fim; index++) {

            let url = `https://pokeapi.co/api/v2/pokemon/${pkmon_number}`

            pkmon_number+=1
            
            const response = await fetch(url)

            const data = await response.json()
            
            criarCardPkmon(data)

            if(data.id >= fim){
                pd_del = true
                
                let cards_pokemon = [...document.querySelectorAll('.card-pkmon')]
                cards_pokemon.map((el) => {
                    el.addEventListener('click', (e) => {
                        criarCardMyTeam(el)
                    })
                })
            }

        }
    }
    api(cmc, fim)
}

pokedex_1(cmc_gen_fim_1[0], cmc_gen_fim_1[1])

let btns_click_gen = [...document.querySelectorAll(".ch-gen")]

btns_click_gen[0].addEventListener('click', () => {
    pokedex_1(cmc_gen_fim_1[0], cmc_gen_fim_1[1])
})

btns_click_gen[1].addEventListener('click', () => {
    pokedex_1(cmc_gen_fim_2[0], cmc_gen_fim_2[1])
})

btns_click_gen[2].addEventListener('click', () => {
    pokedex_1(cmc_gen_fim_3[0], cmc_gen_fim_3[1])
})

let btns_click_gen_p = [...document.querySelectorAll(".ch-gen-p")]

btns_click_gen_p[0].addEventListener('click', () => {
    pokedex_1(cmc_gen_fim_1[0], cmc_gen_fim_1[1])
})

btns_click_gen_p[1].addEventListener('click', () => {
    pokedex_1(cmc_gen_fim_2[0], cmc_gen_fim_2[1])
})

btns_click_gen_p[2].addEventListener('click', () => {
    pokedex_1(cmc_gen_fim_3[0], cmc_gen_fim_3[1])
})

function criarCardPkmon(data){
    
            //CRIAÇÃO DOS ELEMENTOS
            const div_resp = document.createElement('div')
            const div_card = document.createElement('div')
            const img_card = document.createElement('img')
            const div_card_body = document.createElement('div')
            const title_card = document.createElement('h5')
            const description_card = document.createElement('p')
            const div_types =  document.createElement('div')
            const type_1 =  document.createElement('span')
            const type_2 =  document.createElement('span')

            //ADIÇÃO DO CONTEUDO DOS ELEMENTOS
            img_card.src =  data['sprites']['versions']['generation-viii']['icons']['front_default']
            title_card.innerText = `# ${data.id}`
            description_card.innerText = data.name
            type_1.innerText = data.types[0].type.name
            if(data.types[1]){
                type_2.innerText = data.types[1].type.name
            }

            //ADIÇÃO DAS CLASSES DSO ELEMENTOS
            div_resp.classList.add('col-6')
            div_resp.classList.add('card-pkmon')
            div_resp.classList.add('py-3')
            div_resp.classList.add('col-sm-4')
            div_card.classList.add('card')
            div_card.style.maxWidth = "18rem"
            img_card.classList.add('card-img-top')
            img_card.classList.add('img-fluid')
            div_card_body.classList.add('card-body')
            title_card.classList.add('card-title')
            title_card.classList.add('font_pixel')
            description_card.classList.add('card-text')
            description_card.classList.add('font_pixel')
            div_types.classList.add('d-flex')
            div_types.classList.add('justify-content-around')
            div_types.classList.add('align-items-center')
            div_types.classList.add('w-100')
            type_1.classList.add('flex-fill')
            type_2.classList.add('flex-fill')
            type_1.classList.add('text-center')
            type_2.classList.add('text-center')
            div_types.classList.add('font_pixel')

            for (let fix = 0; fix < types.length; fix++) {
                if(data.types[0].type.name === types[fix]){
                    type_1.style.backgroundColor = cores[fix]
                }
                if(data.types[1]){
                    if(data.types[1].type.name === types[fix]){
                        type_2.style.backgroundColor = cores[fix]
                    }
                }
            }

            //ADIÇÃO DOS ELEMENTOS
            div_card_body.appendChild(title_card)
            div_card_body.appendChild(description_card)
            div_card.appendChild(img_card)
            div_types.appendChild(type_1)
            if(data.types[1]){
                div_types.appendChild(type_2)
            }
            div_card_body.appendChild(div_types)
            div_card.appendChild(div_card_body)
            div_resp.appendChild(div_card)
            div_pkms.appendChild(div_resp)
            
            //console.log(div_resp.innerHTML)
            

}

async function car1pkm(){
    
    let url = `https://pokeapi.co/api/v2/pokemon/${pkmon_number}`

    const response = await fetch(url)

    const data = await response.json()

    criarCardPkmon(data)

    let cards_pokemon = [...document.querySelectorAll('.card-pkmon')]
    cards_pokemon.map((el) => {
        el.addEventListener('click', (e) => {
            criarCardMyTeam(el)
        })
    })

}

function limparResultados(){
    
    pkmon_number = input_search.value.toLowerCase()

    if(pd_del == true){
        div_pkms.innerHTML = ""
    }
    
}

setInterval(() => {

    if(pd_del == false){
        btn_pesq.classList.remove("d-block")
        btn_pesq.classList.add("d-none")
        
        loading_icon.classList.remove("d-none")
        loading_icon.classList.add("d-block")
    }else{
        btn_pesq.classList.remove("d-none")
        btn_pesq.classList.add("d-block")

        loading_icon.classList.remove("d-block")
        loading_icon.classList.add("d-none")

    }  
    
}, 1);

btn_pesq.addEventListener('click', (e) => {
    e.preventDefault()
    if(pd_del == true){
        limparResultados()
        car1pkm()
    }
})

//FUNÇAO MY TEAM
const btn_tela_my_team = [...document.querySelectorAll('.team-icon')]
const btn_close_tela_my_team = document.querySelector('#btn-close-my-team')

btn_tela_my_team[0].addEventListener('click', () => {
    if(tela_my_team.classList.contains('d-none')){
        tela_my_team.classList.remove('d-none')
        tela_my_team.classList.add('d-flex')
    }else if(tela_my_team.classList.contains('d-flex')){
        tela_my_team.classList.remove('d-flex')
        tela_my_team.classList.add('d-none')        
    }
})

btn_tela_my_team[1].addEventListener('click', () => {
    if(tela_my_team.classList.contains('d-none')){
        tela_my_team.classList.remove('d-none')
        tela_my_team.classList.add('d-flex')
    }else if(tela_my_team.classList.contains('d-flex')){
        tela_my_team.classList.remove('d-flex')
        tela_my_team.classList.add('d-none')        
    }
})

btn_close_tela_my_team.addEventListener('click', () => {
    if(tela_my_team.classList.contains('d-none')){
        tela_my_team.classList.remove('d-none')
        tela_my_team.classList.add('d-flex')
    }else if(tela_my_team.classList.contains('d-flex')){
        tela_my_team.classList.remove('d-flex')
        tela_my_team.classList.add('d-none')        
    }
})

const tela_my_team = document.querySelector('#tela-my-team')
let eq_pkmon = 0

function criarCardMyTeam(el){
    let cards_pokemon = [...document.querySelectorAll('.card_my_team')]
    eq_pkmon = cards_pokemon.length
    if(eq_pkmon > 5){
        return
    }
    let moves = []

    let pkmon_number =  [...el.children[0].children[1].children[0].innerText]
    pkmon_number.shift()
    pkmon_number.shift()
    pkmon_number =  String(pkmon_number)
    pkmon_number =  pkmon_number.replace(',','')
    pkmon_number =  pkmon_number.replace(',','')

    async function mvs(){
        let url = `https://pokeapi.co/api/v2/pokemon/${pkmon_number}`

        const response = await fetch(url)

        const data = await response.json()

        for(let index = 0; index < 4; index++){
            let mmm = [...data.moves]

            const glp_name = document.createElement('select')
            glp_name.classList.add('skill_pkmon')
            glp_name.style.textTransform = "capitalize"

            mmm.map((el, i) => {
                let ggg = el.move.name
                moves.push(ggg)
                let glps_ger = document.createElement('option')
                glps_ger.style.textTransform = "capitalize"
                glps_ger.value = moves[i]
                glps_ger.innerText = moves[i]
                glp_name.appendChild(glps_ger)
            })

           
            glp_list.appendChild(glp_name)
        }
        
    }
    mvs()

    const div_resp = document.createElement('div')
    div_resp.classList.add('card_my_team')
    div_resp.classList.add('col-6')
    div_resp.classList.add('col-sm-4')
    div_resp.classList.add('p-3')
    div_resp.classList.add('mt-5')
    div_resp.classList.add('slots')
    div_resp.classList.add('d-flex')
    div_resp.classList.add('flex-column')
    div_resp.classList.add('text-center')

    const div_card = document.createElement('div')
    div_card.classList.add('card')
    div_card.style.maxWidth = "18rem"

    const img_card = document.createElement('img')
    img_card.classList.add('card-img-top')
    img_card.classList.add('img-fluid')

    const div_card_body = document.createElement('div')
    div_card_body.classList.add('card-body')

    const title_card = document.createElement('h5')
    title_card.classList.add('card-title') 
    title_card.classList.add('text-center') 
    title_card.classList.add('font_pixel')
    
    const description_card = document.createElement('h5')
    description_card.classList.add('card-text')
    description_card.classList.add('text-center')
    description_card.classList.add('font_pixel')

    const div_types = document.createElement('div')
    div_types.classList.add('d-flex')
    div_types.classList.add('justify-content-around')
    div_types.classList.add('align-items-center')
    div_types.classList.add('w-100')
    div_types.classList.add('font_pixel')

    const type_1 = document.createElement('span')
    type_1.classList.add('flex-fill')
    type_1.classList.add('text-center')

    const type_2 = document.createElement('span')
    type_2.classList.add('flex-fill')
    type_2.classList.add('text-center')

    const hr = document.createElement('hr')

    const title_glp = document.createElement('h5')
    title_glp.classList.add('card-title')
    title_glp.classList.add('text-center')
    title_glp.classList.add('font_pixel')
    title_glp.classList.add('mb-3')

    
    const glp_list = document.createElement('div')
    glp_list.classList.add('d-flex')
    glp_list.classList.add('flex-column')
    glp_list.classList.add('w-100')
    glp_list.classList.add('font_pixel')

    const btn_rmv_card = document.createElement('button')
    btn_rmv_card.classList.add('position-absolute')
    btn_rmv_card.classList.add('end-0')
    btn_rmv_card.classList.add('top-0')
    btn_rmv_card.style.border = 'none'
    btn_rmv_card.style.backgroundColor = 'transparent'

    btn_rmv_card.addEventListener('click', (e) => {
        eq_pkmon--
        e.target.parentNode.parentNode.remove()
    })

    //ADICIONANDO DADOS DOS ELEMENTOS
    img_card.src = el.children[0].children[0].src
    title_card.innerText = el.children[0].children[1].children[0].innerText
    description_card.innerText = el.children[0].children[1].children[1].innerText
    type_1.innerText = el.children[0].children[1].children[2].children[0].innerText
    if(el.children[0].children[1].children[2].children[1]){
        type_2.innerText = el.children[0].children[1].children[2].children[1].innerText
    }
    title_glp.innerText = "Golpes"
    
    for(let fix = 0; fix < types.length; fix++){
        if(type_1.innerText.toLocaleLowerCase() == types[fix]){
            type_1.style.backgroundColor = cores[fix]
        }else if(type_2.innerText.toLocaleLowerCase() == types[fix]){
            type_2.style.backgroundColor = cores[fix]
        }        
    }
    btn_rmv_card.innerText = "x"


    //ADICIONANDO CONTEUDO AO HTML
    div_resp.appendChild(div_card)
    div_card.appendChild(img_card)
    div_card.appendChild(btn_rmv_card)
    div_card.appendChild(div_card_body)
    div_card_body.appendChild(title_card)
    div_card_body.appendChild(description_card)
    div_card_body.appendChild(div_types)
    div_types.appendChild(type_1)
    if(el.children[0].children[1].children[2].children[1]){
        div_types.appendChild(type_2)
    }
    div_card.appendChild(hr)
    div_card.appendChild(title_glp)
    div_card.appendChild(glp_list)
    
    tela_my_team.appendChild(div_resp)
}
