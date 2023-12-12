import {Router} from 'express';
import {UserController} from './user.controller';
import {user} from "./user";


export class UserRouter {
    router = Router();

    constructor(private userController: UserController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/:id', (req, res, next) => {
            try {
                const result = this.userController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('', async (req, res, next) => {
            try {
                const result = await this.userController.getAllUser();
                console.log(result);
                res.status(200).json(result);
            } catch (error) {
                next(error);
            }
        });


        this.router.post('/add-user', (req, res, next) => {
            try {
                const result = this.userController.add(req.body.username, req.body.prenom, req.body.nom, req.body.mail);
                res.status(200).json(result);
                console.log(result)
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.delete('/delete/:id', (req, res, next) => {
            try {
                const result = this.userController.deleteUser(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.put('/update/:id', (req, res, next) => {
            try {
                const id = parseInt(req.params.id);
                const updatedUserData: Partial<user> = req.body; // Assurez-vous que le corps de la requête contient les données mises à jour
                const result = this.userController.updateUser(id, updatedUserData);

                if (result) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({error: `Utilisateur avec l'ID ${id} non trouvé.`});
                }
            } catch (error) {
                next(error);
            }
        });
    }
}