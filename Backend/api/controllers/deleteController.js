const User = require("../models/User");
const Film = require("../models/Film");

// Fungsi deleteUser untuk menghapus user berdasarkan ID

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // Mengambil ID dari parameter URL
        const user = await User.findByIdAndDelete(id); // Mencari user berdasarkan ID dan menghapusnya
        if (!user) { // Jika user tidak ditemukan
            return res.status(404).json({
                message: `User with ID ${id} not found!`
            })
        }
        res.status(200).json({
            message: "User deleted successfully!",
            data: user
          }); // Mengembalikan response user yang dihapus
    } catch (error) { // Jika terjadi error akan merespon dengan status 500 dan pesan error
        res.status(500).json({
            message: error.message
        });
    }
}

exports.deleteFilm = async (req, res) => {
    try {
        const { id } = req.params; // Mengambil ID dari parameter URL
        const film = await Film.findByIdAndDelete(id); // Mencari film berdasarkan ID dan menghapusnya
        if (!film) { // Jika film tidak ditemukan
            return res.status(404).json({
                message: `Film with ID ${id} not found!`
            })
        }
        res.status(200).json({
            message: "Film deleted successfully!",
            data: film
          }); // Mengembalikan response film yang dihapus
    } catch (error) { // Jika terjadi error akan merespon dengan status 500 dan pesan error
        res.status(500).json({
            message: error.message
        });
    }
}