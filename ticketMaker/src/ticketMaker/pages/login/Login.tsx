import { Box, Button, Container, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { AxiosApi } from '../api/api';

export const Login = () => {

    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [password, setPassword] = useState("")

    const handleOnLogin = async () => {
        //console.log("name:", name);
        //console.log("password:", password);
        
        if(name.length > 0 && password.length > 0){
            const response = await AxiosApi.post('https://localhost:7184/api/login', {
                name,
                password
            })

            if(response.status == 200){
                console.log("redirect");
                navigate("/home")
            }
        }else{
            alert('Datos incorrectos')
        }
    }

    return (
        <Container component='main' maxWidth="xs">
            <Box
                sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                alignContent={'center'}
            >
                <Box >
                    <TextField
                        value={name}
                        onChange={(e) => {
                            setName(e.currentTarget.value)
                        }}
                        label="Nombre"
                        fullWidth
                        sx={{ marginY: 3}}
                    />

                    <TextField
                        value={password}
                        onChange={(e) => {
                            setPassword(e.currentTarget.value)
                        }}
                        label="Contraseña"
                        type='password'
                        fullWidth
                        sx={{ marginY: 3}}
                    />
                    <Button fullWidth onClick={handleOnLogin} > LOGIN </Button>
                </Box>
                {/* <Grid container alignContent={'center'} alignItems={'center'}> */}


                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                </Grid>
                {/* </Grid> */}
            </Box>

        </Container>
    )
}
