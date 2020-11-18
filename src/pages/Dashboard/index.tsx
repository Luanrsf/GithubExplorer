import React,{useState,FormEvent,useEffect} from "react";
import {Link} from "react-router-dom"
import api from "../../services/api";
import logo from '../../assets/logo.svg'
import {Title,Form,Repositories,Error} from "./styles"
import {FiChevronRight} from 'react-icons/fi'

interface Repository {
    full_name:string;
    description:string;
    owner:{
        login:string;
        avatar_url:string;

    }
}
const Dashboard:React.FC = ()=>{
    const [newRepo,setNewRepo] = useState('')
    const [inputError,setInputError] = useState('')
    const [repositories, setRepositories] = useState<Repository[]>(()=>{
        const storageRepositories = localStorage.getItem("@GithubExplorer:repositories");
        if(storageRepositories){
            return JSON.parse(storageRepositories);
        }
        else{
            return []
        }
    });
    async function handleAddRepository(event:FormEvent<HTMLFormElement>):Promise<void>{
        event.preventDefault()
        if(!newRepo){
            setInputError('Digite o autor/nome do repositório');
            return;
        }
        try{
            const response = await api.get<Repository>(`repos/${newRepo}`);
            const repository = response.data
            setRepositories([...repositories,repository])
            setNewRepo('')
            setInputError('');
        }
        catch(err){
            setInputError("Erro na busca por esse repositório");

        }

    }
    useEffect(()=>{
        localStorage.setItem("@GithubExplorer:repositories",JSON.stringify(repositories))
    },[repositories])
    return(
        <>
        <img src={logo}/>
        <Title>Explore repositórios do Github</Title>
        <Form hasError={!!inputError} onSubmit={handleAddRepository}>
            <input
            placeholder="Digite o nome do repositorio"
            value={newRepo}
            onChange={e=>setNewRepo(e.target.value)}
            />
            <button type="submit">Pesquisar</button>
        </Form>
        {inputError&&<Error>{inputError}</Error>}
        <Repositories>
            {repositories.map(
                (repository)=>(
                    <Link to={`/repositories/${repository.full_name}`} key={repository.full_name}>
                    <img
                    src={repository.owner.avatar_url}
                    alt={repository.owner.login}/>
                    <div>
                    <strong>{repository.full_name}</strong>
                    <p>{repository.description}</p>

                    </div>
                    <FiChevronRight size={20}/>
                </Link>
                )
                )}

        </Repositories>

        </>
    )
}

export default Dashboard;
