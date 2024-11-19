import React, { useState, useEffect } from 'react';
import { db } from '/src/Firebase/firebaseConfig.js'; // Asegúrate de tener configurado Firebase
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import "./users.css"

const GestionUsuarios = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
    const [editingUser, setEditingUser] = useState(null); // Para editar
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // Inicializa la función de navegación

    // Fetch users from Firestore
    useEffect(() => {
        const fetchUsers = async () => {
            const querySnapshot = await getDocs(collection(db, 'usuarios'));
            const usersList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(usersList);
        };
        fetchUsers();
    }, []);

    const handleCancel = () => {
        navigate('/ppalAdmin'); // Navegar a la ruta deseada
    };

    // Add new user
    const handleAddUser = async () => {
        try {
            if (!newUser.name || !newUser.email || !newUser.role) {
                setError('Todos los campos son obligatorios');
                return;
            }
            await addDoc(collection(db, 'usuarios'), newUser);
            setNewUser({ name: '', email: '', role: '' }); // Clear form
            setError(null);
        } catch (error) {
            console.error("Error adding user: ", error);
            setError('Hubo un error al agregar el usuario.');
        }
    };

    // Handle delete user
    const handleDelete = async (userId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            try {
                const userRef = doc(db, 'usuarios', userId);
                await deleteDoc(userRef);
                setUsers(users.filter(user => user.id !== userId));
            } catch (error) {
                console.error("Error deleting user: ", error);
                setError('Hubo un error al eliminar el usuario.');
            }
        }
    };

    // Handle edit user
    const handleEdit = (user) => {
        setEditingUser(user);
        setNewUser({ name: user.name, email: user.email, role: user.role });
    };

    // Update user
    const handleUpdateUser = async () => {
        if (!newUser.name || !newUser.email || !newUser.role) {
            setError('Todos los campos son obligatorios');
            return;
        }
        try {
            const userRef = doc(db, 'usuarios', editingUser.id);
            await updateDoc(userRef, newUser);
            setUsers(users.map(user => user.id === editingUser.id ? { ...user, ...newUser } : user));
            setNewUser({ name: '', email: '', role: '' });
            setEditingUser(null);
            setError(null);
        } catch (error) {
            console.error("Error updating user: ", error);
            setError('Hubo un error al actualizar el usuario.');
        }
    };

    return (
        <div className="gestion-usuarios">
            <h1>Gestión de Usuarios</h1>
            <button className="logout-btn" onClick={handleCancel}>
                Regresar
            </button>
            <div className="user-form">
                <h2>{editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Correo"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                    <option value="">Selecciona un rol</option>
                    <option value="administrador">Administrador</option>
                    <option value="investigador">Investigador</option>
                    <option value="colaborador">Colaborador</option>
                </select>
                <button onClick={editingUser ? handleUpdateUser : handleAddUser}>
                    {editingUser ? 'Actualizar Usuario' : 'Agregar Usuario'}
                </button>
                {error && <p className="error">{error}</p>}
            </div>
            <div className="user-list">
                <h2>Usuarios Registrados</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => handleEdit(user)}>Editar</button>
                                    <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GestionUsuarios;
