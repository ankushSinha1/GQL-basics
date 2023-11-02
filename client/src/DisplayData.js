import { useQuery,useLazyQuery,gql, useMutation } from "@apollo/client"
import { useState } from "react"

const QUERY_ALL_USERS = gql`
    query GetUsers {
        users {
            age
            name
            username
            nationality
        }
    }
`
const QUERY_ALL_MOVIES = gql`
    query GetAllMovies {
        movies {
            id
            name
            isInTheatres
            yearOfPublication
        }
    }
`
const GET_MOVIE = gql`
    query Movie($name: String!){
        movie(name: $name){
            name
            yearOfPublication
        }
    }
`

const CREATE_USER = gql`
    mutation CreateUser($input: createUserInput!){
        createUser(input: $input){
            name
            id
        }
    }
`
const DisplayData = () => {
    const [movieSearched, setMovieSearched] = useState('')

    //CREATE USER STATES
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [username, setUserName] = useState('')
    const [nationality, setNationality] = useState('')

    const {data: data1, refetch} = useQuery(QUERY_ALL_USERS)
    const {data:data2} = useQuery(QUERY_ALL_MOVIES)
    const[fetchMovie,
        {data: movieFound, error: movieError},
    ] = useLazyQuery(GET_MOVIE)

    const [createUser] = useMutation(CREATE_USER)
    return (
        <div>
            <div>
                <input 
                    type='text'
                    value={name}
                    placeholder="name" 
                    onChange={(e)=>{setName(e.target.value)}}
                />
                <input 
                    type='number'
                    value={age}
                    placeholder="age" 
                    onChange={(e)=>{setAge(e.target.value)}}
                />
                <input 
                    type='text'
                    value={username}
                    placeholder="username" 
                    onChange={(e)=>{setUserName(e.target.value)}}
                />
                <input 
                    type='text'
                    value={nationality}
                    placeholder="nationality" 
                    onChange={(e)=>{setNationality(e.target.value.toUpperCase())}}
                />
                <button onClick={()=> {
                    createUser({
                        variables:{input:{name, age:Number(age), username, nationality}}
                    })
                    refetch()
                }}
                >
                    Create User
                </button>
            </div>
            Users:
            {data1?.users.map(user =>{return(
                <ul>
                    <h1>{user.name}</h1>
                    <li>{user.age}</li>
                    <li>{user.username}</li>
                    <li>{user.nationality}</li>
                </ul>
            )
            })}
            {/* Movies:{
                data2?.movies.map(movie=>{
                    return(
                        <div>
                            <h1>{movie.name}</h1>
                            <h1>{movie.id}</h1>
                            <h1>{movie.isInTheatres}</h1>
                            <h1>{movie.yearOfPublication}</h1>
                        </div>
                    )
                })
            } */}
            <div>

                <input type="text" placeholder="movie name" onChange={(e)=>setMovieSearched(e.target.value)}/>
                <button onClick={()=>fetchMovie({variables:{name:movieSearched}})}>Fetch</button>
            </div>
            <div>
                <div>
                    Movie: {movieFound?.movie.name}
                    Release year:{movieFound?.movie.yearOfPublication}
                </div>
            </div>
        </div>
    )
}

export default DisplayData
