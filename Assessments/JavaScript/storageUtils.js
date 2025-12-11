const STORAGE_KEY = 'hospitalAppointments';
 
export const getItem = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error reading from localStorage:", error);
        return [];
    }
};

export const setItem = (appointments) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    } catch (error) {
        console.error("Error writing to localStorage:", error);
    }
};

export const deleteItem = (id) => {
    let appointments = getItem();
    appointments = appointments.filter(app => app.id !== id);
    setItem(appointments);
};