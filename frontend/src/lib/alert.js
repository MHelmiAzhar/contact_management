import Swal from 'sweetalert2';

export const alertSuccess = async(message) => {
    return Swal.fire({
        title: 'Success',
        text: message,
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
            popup: 'bg-gray-800 text-white shadow-custom border border-gray-700 backdrop-blur-sm'
        }
    });
}

export const alertError = async(message) => {
    return Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
            popup: 'bg-gray-800 text-white shadow-custom border border-gray-700 backdrop-blur-sm'
        }
    });
}