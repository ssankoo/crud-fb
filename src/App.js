
import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'

function App() {

  const [editQuantity, setEditQuantity] = useState(0);
  const [editItemId, setEditItemId] = useState(null);



  const [newCol, setNewCol] = useState("")
  const [newMat, setNewMat] = useState("")
  const [newCantidad, setNewCantidad] = useState(0)

  const [items, setItems] = useState([])
  const itemsCollectionRef = collection(db, "items")

  const deleteItem = async (itemId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
      await deleteDoc(doc(db, "items", itemId));
      // Update the items list by filtering out the deleted item
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    }
  };


  const enableEdit = (itemId) => {
    const itemToEdit = items.find((item) => item.id === itemId);
    setEditItemId(itemId);
    setEditQuantity(itemToEdit.cantidad);
  };

  const saveEditedQuantity = async (itemId) => {
    await updateDoc(doc(db, "items", itemId), {
      cantidad: editQuantity,
    });
    setEditItemId(null);
  };


  const createItem = async () => {
    await addDoc(itemsCollectionRef, { color: newCol, material: newMat, cantidad: newCantidad })
  }

  useEffect(() => {

    const getItems = async () => {
      const data = await getDocs(itemsCollectionRef)
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    getItems();
  }, []);

  return (
    <div className="App">
      <input type='text' placeholder='Color...' onChange={(event) => { setNewCol(event.target.value) }} />
      <input type="text" placeholder='Material...' onChange={(event) => { setNewMat(event.target.value) }} />
      <input type="number" placeholder='Cantidad...' onChange={(event) => { setNewCantidad(event.target.value) }} />
      <button onClick={createItem}>Agregar item</button>

      <table>
        <thead>
          <tr>
            <th>COLOR</th>
            <th>MATERIAL</th>
            <th>CANTIDAD</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.color}</td>
              <td>{item.material}</td>
              <td>
                {editItemId === item.id ? (
                  <input
                    type="number"
                    value={editQuantity}
                    onChange={(event) => setEditQuantity(event.target.value)}
                  />
                ) : (
                  item.cantidad
                )}
              </td>
              <td>
                {editItemId === item.id ? (
                  <button onClick={() => saveEditedQuantity(item.id)}>Guardar</button>
                ) : (
                  <button onClick={() => enableEdit(item.id)}>Editar cantidad</button>
                )}
                <button onClick={() => deleteItem(item.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
