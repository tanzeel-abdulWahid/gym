import {useState, useEffect} from 'react'
import {Box, Stack, TextField, Typography, Button} from '@mui/material'
import { exerciseOptions,fetchData } from '../utits/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar'


const SearchExercise = ({setExercises, bodyPart, setBodyPart}) => {
    const [search, setSearch] = useState('');
    const [bodyParts, setBodyParts] = useState([])
    useEffect (() => {
        const fetchExercisesData = async () => {
            const bodyPartsData = await fetchData('https://exercise.p.rapidapi.com/exercises/bodyPartList',exerciseOptions);

            setBodyParts([...bodyPartsData]);
        }

        fetchExercisesData();
    },[])

    const handleSearch = async () => {  
        if(search){
            const exercisesData = await fetchData(
            "https://exercisedb.p.rapidapi.com/exercises", exerciseOptions
            );

            const searchedExercises = exercisesData.filter((exercise) => exercise.name.toLowerCase().includes(search) ||
            exercise.target.toLowerCase().includes(search) ||
            exercise.equipment.toLowerCase().includes(search) ||
            exercise.bodyPart.toLowerCase().includes(search)
            );

            setSearch('')
            setExercises(searchedExercises);

            // console.log({exercises});
        }
    }

    return (
        <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
            
            <Typography fontWeight={700} sx={{fontSize:{lg: '44px', xs:'30px'}}} mb="50px" textAlign="center">
                Awesome Exercises You <br/> should Know
            </Typography>

            <Box position="relative">

                <TextField sx={{
                    input:{
                        fontWeight:"700",
                        border:'none',
                        borderRadius:"4px",
                    }, width:{
                        lg: '1170px',xs:'350px'
                    },
                    backgroundColor:'#FFFFFF', 
                    borderRadius: "40px"
                    
                }}
                height="76px" value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder="Search Exercises" type="text"
                />

                <Button 
                onClick={handleSearch}
                className='search-btn'
                sx={{backgroundColor:'#ff2625', color:'#fff', textTransform:'none', width: {lg: '175px', xs:'80px'},
                fontSize:{lg:'20px', xs:'14px'},
                height:'56px',position:'absolute',right:0}}>
                    Search
                </Button>

            </Box>

            <Box sx={{position:'relative', width:'100%', p:'20px'}}>

                <HorizontalScrollbar data={bodyParts} 
                bodyPart={bodyPart} setBodyPart={setBodyPart} />
            </Box>
        </Stack>
    )
}

export default SearchExercise