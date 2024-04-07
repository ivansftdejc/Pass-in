let participantes=[
  {
    nome: "Ivandro Chindumbo",
    email: "ivandroadelino98@gmail.com",
    dataInscricao: new Date(2024, 3, 6, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20)
  }
  ]
const criarNovoParticipante=(participante)=>{
  const dataInscricao=dayjs(Date.now()).to(participante.dataInscricao);
  let dataCheckIn=dayjs(Date.now()).to(participante.dataCheckIn)
  
  if (participante.dataCheckIn==null)
      {
      dataCheckIn= `
          <button
          data-email="${participante.email}"
          onclick="fazerCheckIn(event)"
          >Confirmar Checkin
          </button>
        `
        }
  return `
    <tr>
      <td>
        <strong>${participante.nome}</strong>
        <br>
        <small>${participante.email}</small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>`
}
const actualizarLista=(participantes)=> {
  let saida="";
  for(let participante of participantes){
    saida=saida+criarNovoParticipante(participante);
  }
document.querySelector('tbody').innerHTML=saida

}
actualizarLista(participantes)


const adicionarParticipante= (event)=>{
  event.preventDefault()

  const dadosDoFormulario= new FormData(event.target)

  const participante={
    nome:dadosDoFormulario.get('nome'),
    email:dadosDoFormulario.get('email'),
    dataInscricao: new Date,
    dataCheckIn:null
  }
  const verificarParticipante=participantes.find(
    (p)=>{
      return p.email==participante.email
    }
  )
  if(verificarParticipante)
  {
    return alert('Este e-mail já existe')
  }
  
  participantes=[participante,...participantes]
  actualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value=""
  event.target.querySelector('[name="email"]').value=""
}
const fazerCheckIn=(event)=>{
  const result= confirm("Deseja confirmar o Checkin do participante?")
  if (result==false)
  {
    return
  }
  const participante= participantes.find((p)=>{
    return p.email==event.target.dataset.email
  })
  participante.dataCheckIn=new Date()

  actualizarLista(participantes)

}