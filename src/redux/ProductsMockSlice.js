import {createSlice} from '@reduxjs/toolkit';

const productsMockSlice = createSlice({
  name: 'tokenSlice',
  initialState: {
    historyProducts: [
      {
        id: 1,
        status: "Em separação",
        name: "Camisa Florida",
        color: "Rosa",
        owner: "Camila Aparecida",
        devolutionDate: "20/10/2020",
        rentValue: 50,
        image: "https://app-cabideiro.s3.amazonaws.com/c0ca165335a76a4e910a-image1.jpg"
      },{
        id: 2,
        status: "Enviado",
        name: "Terno",
        color: "Preto",
        owner: "Camila Aparecida",
        devolutionDate: "20/10/2020",
        rentValue: 100,
        image: "https://app-cabideiro.s3.amazonaws.com/c0ca165335a76a4e910a-image1.jpg"
      },{
        id: 3,
        status: "Entregue",
        name: "Vestido Longo",
        color: "Azul",
        owner: "Camila Aparecida",
        devolutionDate: "20/10/2020",
        rentValue: 80,
        image: "https://app-cabideiro.s3.amazonaws.com/c0ca165335a76a4e910a-image1.jpg"
      },{
        id: 4,
        status: "Devolvido",
        name: "Camisa",
        color: "Branco",
        owner: "Camila Aparecida",
        devolutionDate: "10/10/2020",
        rentValue: 40,
        image: "https://app-cabideiro.s3.amazonaws.com/c0ca165335a76a4e910a-image1.jpg"
      }
    ],
    incomeProducts: []
  },
  reducers: {
    addProduct: (state, action) => {
      state.historyProducts.push(action.payload);
    },
    changeStatus: (state, action) => {
      const newProducts = state[action.payload.target].map(prod => {
        if (prod.id === action.payload.id)
          prod.status = action.payload.status
        return prod;
      })
      state[action.payload.target] = newProducts;
    },
    setIncomeProducts: (state, action) => {
      state.incomeProducts = action.payload
    }
  }
});

export const {addProduct, changeStatus, setIncomeProducts} = productsMockSlice.actions;

export default productsMockSlice.reducer;