import {readFile, writeFile} from 'fs';
import {user} from './user';
import {UserService} from './user.service';

export class UserJSONService implements UserService {

    private newUser!: user
    private data!: string

    add(username: string, prenom: string, nom: string, mail: string): user {
        readFile('./src/user/utilisateurJson.json', 'utf8', (err, data) => {
                if (err) {
                    console.error('erreur de lecture');
                } else {
                    this.data = data;
                    const userExist = this.getByUsername(username);
                    if (userExist) {
                        console.error('le nom existe deja')
                    } else {

                        let utilisateur = JSON.parse(this.data);
                        const Id = this.genererId();

                        this.newUser = new user(Id, username, prenom, nom, mail);

                        utilisateur.push(this.newUser);

                        const addUser = JSON.stringify(utilisateur);

                        writeFile('./src/user/utilisateurJson.json', addUser, 'utf8', (err) => {
                            if (err) {
                                throw new Error("erreur lors de l'écriture du fichier");
                            }
                        });
                    }
                }
            }
        )
        return this.newUser;
    }

    genererId() : number {
        return Math.floor(Math.random() * 999999);
    }

    getByUsername(username: string): user | null {
        readFile('./src/user/utilisateurJson.json', 'utf8', (err, data) => {
            if (err) {
                console.error('erreur de lecture')
            }
            this.data = data;
        })
        const dataJson = JSON.parse(this.data);
        for (let i = 0; i < dataJson.length; i++) {
            if (dataJson[i].username == username) {
                this.newUser = dataJson[i]
            }
        }
        return this.newUser;
    }

    getById(id: number): user | null {
        readFile('./src/user/utilisateurJson.json', 'utf8', (err, data) => {
            if (err) {
                console.error('erreur de lecture')
            }
            this.data = data;
        })
        const dataJson = JSON.parse(this.data);
        for (let i = 0; i < dataJson.length; i++) {
            if (dataJson[i].id == id) {
                this.newUser = dataJson[i]
            }
        }
        return this.newUser;
    }

    getAllUser() : Promise<user[] | null> {
        return new Promise((resolve, reject) => {
            readFile('./src/user/utilisateurJson.json', 'utf8', (err, data) => {
                if (err) {
                    console.error('Erreur de lecture', err);
                    reject(err);
                } else {
                    try {
                        const dataJson = JSON.parse(data);
                        const allUser: user[] = dataJson.map((userData: { id: number; username: string, prenom: string, nom: string, mail: string }) =>
                            new user(userData.id, userData.username, userData.prenom, userData.nom, userData.mail));
                        resolve(allUser);
                    } catch (parseError) {
                        console.error('Erreur de parsing JSON', parseError);
                        reject(parseError);
                    }
                }
            });
        });
    }

    deleteUser(id : number) : user | null {
        readFile('./src/user/utilisateurJson.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Erreur de lecture');
                return null;
            }
            let users = JSON.parse(data);
            // Recherche de l'index de l'utilisateur dans le tableau
            // @ts-ignore
            const index = users.findIndex(user => user.id == id);

            if (index !== -1) {
                // Suppression de l'utilisateur du tableau
                const deletedUser = users.splice(index, 1)[0];

                // Écriture du tableau mis à jour dans le fichier JSON
                writeFile('./src/user/utilisateurJson.json', JSON.stringify(users), 'utf8', (err) => {
                    if (err) {
                        console.error('Erreur d\'écriture');
                        return null;
                    }
                    console.log(`Utilisateur avec l'ID ${id} supprimé avec succès.`);
                    return deletedUser;
                });
            } else {
                console.log(`Utilisateur avec l'ID ${id} non trouvé.`);
                return null;
            }
            return null;
        });
        return null;
    }

    updateUser(id : number, updatedUserData : Partial<user>) : user | null {
        readFile('./src/user/utilisateurJson.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Erreur de lecture');
                return null;
            }

            let users: user[] = JSON.parse(data);

            // Recherche de l'index de l'utilisateur dans le tableau
            const index = users.findIndex(user => user.id === id);

            if (index !== -1) {
                // Mise à jour des données de l'utilisateur
                users[index] = {...users[index], ...updatedUserData};

                // Écriture du tableau mis à jour dans le fichier JSON
                writeFile('./src/user/utilisateurJson.json', JSON.stringify(users), 'utf8', (err) => {
                    if (err) {
                        console.error('Erreur d\'écriture');
                        return null;
                    }

                    console.log(`Utilisateur avec l'ID ${id} mis à jour avec succès.`);
                    return users[index];
                });
            } else {
                console.log(`Utilisateur avec l'ID ${id} non trouvé.`);
                return null;
            }
        });
        return null;
    }
}