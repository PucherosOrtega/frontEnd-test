import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from 'dayjs';
import { Box, Button, Container, Grid, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { AxiosApi } from '../api/api'
import { AddBox, DateRange, Delete, Edit, Today, TramSharp } from '@mui/icons-material'
import axios from 'axios'

export const Home = () => {

    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState<'add'|'edit'>('add');
    const [selectedTicketId, setSelectedTicketId] = useState(0);
    const [moneda,getMonedas]=useState([]);
    const [monedaID,setMonedaID] = useState(1);
    const [proveedorID,setProveedorID] = useState(1);
    const [comentario,setComentario] = useState('');
    const [monto,setMonto] = useState('');
    const [rows, setRows] = useState([]);
    const [date, setDate] = useState<Dayjs | null>(null);

    const [proveedor,getProveedores]=useState([]);
    const [ticketModal, setTicketModal] = useState<any>([])
    
    const getMoneda = async () =>{
        const response = await AxiosApi.get('https://localhost:7184/api/moneda');
        if(response.status == 200){
                getMonedas(response.data);
        }
    }

    const getProveedor = async () =>{
        const response = await AxiosApi.get('https://localhost:7184/api/Proveedor');
        if(response.status == 200){
            getProveedores(response.data);
        }
    }

    const getRecibos = async () => {
        const response = await AxiosApi.get('https://localhost:7184/api/recibo');
        if(response.status == 200){
            console.log(response.data);
            setTicketModal(response.data);
            setMonedaID(response.data[0].monedaID);
            setProveedorID(response.data[0].proveedorID)
        }
        console.log(ticketModal);
    }


    const handleOnChangeInputMonto = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMonto(e.target.value);
    }
    const handleOnChangeInputComentario = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setComentario(e.target.value);
    }

    const handleOnOpen = () =>{
        setModalType('add')
        setOpenModal(true);
        setSelectedTicketId(0)
        setMonto('');
        setComentario('');
    }

    const onSubmit = async () => {
       //if(ticketModal.proveedor.length < 1 || ticketModal.monto < 1 ){
       //    alert('Faltan datos necesatrios')
       //    return;
       //}
        if(modalType == 'add'){
            const data = {
                "reciboID": 0,
                "proveedorID": proveedorID,
                "monedaID": monedaID,
                "userID": 2,
                "date": "2024-01-24T06:53:58.901Z",
                "comentario": comentario,
                "monto": parseFloat(monto)
            }
            axios.post('https://localhost:7184/api/recibo', data).then((result)=>{
                alert("Ticket agregado");
                getRecibos();
            });

        }else{
            console.log(selectedTicketId)
            const data = {
                "reciboID": selectedTicketId,
                "proveedorID": proveedorID,
                "monedaID": monedaID,
                "userID": 2,
                "date": "2024-01-24T06:53:58.901Z",
                "comentario": comentario,
                "monto": parseFloat(monto)
            }
            axios.put(`https://localhost:7184/api/recibo/${selectedTicketId}`, data).then((result)=>{
                alert("Ticket modificado");
                getRecibos();
            });
            
        }
        setOpenModal(false)
    }

    const columns: GridColDef[] = [
        { field: 'reciboID', headerName: 'ID', flex: 1},
        { field: 'proveedorName', headerName: 'PROVEEDOR', flex: 1},
        { field: 'monto', headerName: 'MONTO', flex: 1},
        { field: 'monedaName', headerName: 'MONEDA', flex: 1},
        { field: 'date', headerName: 'FECHA', flex: 1},
        { field: 'comentario', headerName: 'COMENTARIO', flex: 1},
        { field: 'action', headerName: 'Acciones', flex: 1, renderCell: RenderActions },

    ];

    useEffect(() => {
        getProveedor();
        getRecibos();
        getMoneda();
    }, [])
    
    function RenderActions(e: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>){
        const {reciboID} = e.row;

        const deleteTicket = async () => {
            const response = await AxiosApi.delete(`https://localhost:7184/api/recibo/${reciboID}`);
            if(response.status == 200){
             alert("Ticket eliminado")
                getRecibos();
            }
        }

        const editTicket = () => {
            setSelectedTicketId(reciboID);
            setModalType('edit');
            setOpenModal(true);
            const selectedTicket = ticketModal.find((item:any)=> item.reciboID == reciboID)
            setMonto(selectedTicket.monto)
            setComentario(selectedTicket.comentario)
        }

        return (
            <>
                <Button onClick={ deleteTicket }>
                    <Delete />
                </Button>
                <Button onClick={editTicket}>
                    <Edit />
                </Button>
            </>
        )
    }
    let userName = 'User Name';

    function getRowId(row:any) {
        return row.reciboID;
      }

    return (
        <>
            <Container component='main'>
                
                <Grid container>

                    <Grid item  xs={12} marginBottom={5} marginTop={2}>
                        <Typography component={'h1'}>{ userName }</Typography>
                    </Grid>

                    <Grid item xs={12} paddingX={10} paddingTop={5}>
                        <Grid container>
                            <Grid item flex={1} />
                            <Grid item xs={2} >
                                <Button fullWidth onClick={handleOnOpen}>
                                    <AddBox />
                                </Button>
                            </Grid>
                        </Grid>
                        <DataGrid
                            columns={columns}
                            rows={ticketModal}
                            getRowId={
                                getRowId
                            }
                        />

                    </Grid>


                </Grid>

            </Container>
            {
                ticketModal.length > 0 && 
                <Modal
                open={openModal}
                onClose={()=>{ setOpenModal(false) }}

            >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 800,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }} alignContent={'center'}>

                    <Grid container width={'100%'} rowSpacing={2}>
                        <Grid item xs={12}>
                        <Select
                                label='Proveedor'
                                //name='Proveedor'
                                value={proveedorID}
                                onChange={(e:any)=>{
                                        console.log(e.target.value);
                                        setProveedorID(e.target.value);
                                }}
                                sx={{
                                    color: 'black'
                                }}
                                fullWidth

                            >
                                {
                                  proveedor.map((item:any,index)=>{
                                      return<MenuItem key={index} value={item.proveedorID}>{item.proveedorName}</MenuItem>
                                  })
                                }
                        </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label='Monto'
                                name='monto'
                                value={monto}
                                onChange={handleOnChangeInputMonto}
                                fullWidth

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                label='Moneda'
                                name='moneda'
                                value={monedaID}
                                onChange={(e:any)=>{
                                    console.log(e.target.value);
                                    setMonedaID(e.target.value);
                                }}
                                sx={{
                                    color: 'black'
                                }}
                                fullWidth
                            >
                                {
                                  moneda.map((item: any,index)=>{
                                      return <MenuItem key={index} value={item.monedaID}>{item.monedaName}</MenuItem>
                                  })
                                }
                            </Select>
                            
                        </Grid>
                        <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                               // onChange={(e:any)=>setDate(e.target.value)}
                            />
                        </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label='Comentario'
                                name='comentario'
                                value={comentario}
                                onChange={handleOnChangeInputComentario}
                                fullWidth

                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button fullWidth onClick={onSubmit}>
                                {
                                    modalType == 'add'? 'Agregar':'Modificar'
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            }
            
        </>
    )
}
