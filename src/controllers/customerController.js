const controller = {};

controller.list = (req, res) => {
    req.getConnection((error, conn) => {
        conn.query("SELECT * FROM CUSTOMER;", (error, customers) => {
            if (error) {
                res.json(error);
            }
            res.render("customers", {
                data: customers
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((error, conn) => {
        conn.query("INSERT INTO CUSTOMER SET ?", [data], (error, customer) => {
            res.redirect("/");
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((error, conn) => {
        conn.query("DELETE FROM CUSTOMER WHERE ID = ?", [id], (error, customer) => {
            res.redirect("/");
        });
    });
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((error, conn) => {
        conn.query("SELECT * FROM CUSTOMER WHERE ID = ?", [id], (error, customer) => {
            res.render("customers_edit.ejs", {
                data: customer[0]
            });
        });
    })
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
        conn.query("UPDATE CUSTOMER SET ? WHERE ID = ?", [newCustomer, id], (error, customer) => {
            res.redirect("/");
        });
    });
};

module.exports = controller;