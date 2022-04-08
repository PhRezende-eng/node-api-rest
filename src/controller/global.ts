class Routes {
    static responseApi(req: any, res: any) { res.json({ name: 'Paulo Henrique' }) };

    static responseHome(req: any, res: any) { res.send('<h2>API is running</h2>'); };
}

export default Routes;


// const globalController = {
//     responseApi(req, res) { res.json({ name: 'Paulo Henrique' }) },
//     responseHome(req, res) { res.send('<h2>API is running</h2>'); },
// }

// module.exports = globalController;