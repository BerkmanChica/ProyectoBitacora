import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import './AdminCategories.css';

const AdminCategories = () => {
    const navigate = useNavigate();  // Inicializa useNavigate

    const [categories, setCategories] = useState([
        { id: 1, name: 'Botánica' },
        { id: 2, name: 'Ecología' },
        { id: 3, name: 'Geografía' },
        // Agrega más categorías según sea necesario
    ]);

    const handleCancel = () => {
        navigate('/ppalAdmin');  // Usar la función navigate para redirigir
    };

    const handleAddCategory = () => {
        const newCategory = prompt('Ingresa el nombre de la nueva categoría:');
        if (newCategory) {
            const newId = categories.length + 1;
            setCategories([...categories, { id: newId, name: newCategory }]);
        }
    };

    const handleEditCategory = (id) => {
        const categoryToEdit = categories.find(category => category.id === id);
        const newCategoryName = prompt('Edita el nombre de la categoría:', categoryToEdit.name);
        if (newCategoryName) {
            setCategories(categories.map(category =>
                category.id === id ? { ...category, name: newCategoryName } : category
            ));
        }
    };

    const handleDeleteCategory = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
            setCategories(categories.filter(category => category.id !== id));
        }
    };

    return (
        <div className="admin-categories-container">
            <button className="logout-btn" onClick={handleCancel}>
                Regresar
            </button>
            <button className="add-category-btn" onClick={handleAddCategory}>
                Agregar Categoría
            </button>
            <h1>Administrar Categorías</h1>
            <table className="category-table">
                <thead>
                    <tr>
                        <th>Nombre de la Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEditCategory(category.id)}>
                                    Editar
                                </button>
                                <button className="delete-btn" onClick={() => handleDeleteCategory(category.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCategories;
