import { readFile, writeFile } from 'fs';
import { user } from './user';
import { UserService } from './user.service';

export class UserJSONService implements UserService {

    private newUser! : user
    private data! : string

    add(username: string): user {
        readFile('./src/user/utilisateurJson.json', 'utf8', (err, data) => {
            if (err){
                console.error('erreur de lecture')
            }
            this.data = data;
        }) 
        const userExist = this.getByUsername(username);
        if (userExist){
            console.error('le nom existe deja')
        }else{
            let utilisateur = JSON.parse(this.data);
            const Id = this.genererId()
            
            this.newUser = new user(Id, username);
            utilisateur.push(this.newUser);
            
            const addUser = JSON.stringify(utilisateur);

            writeFile('./src/user/utilisateurJson.json', addUser, 'utf8', (err) => {
                if (err) {
                    throw new Error('erreur lors de l\'ecriture du fichier');
                }
            })
        }
        return this.newUser
    }

    genererId() : number {
        return Math.floor(Math.random() * 999999);
    }

    getByUsername(username: string): user | null {
        readFile('./src/user/utilisateurJson.json', 'utf8', (err, data) => {
            if (err){
                console.error('erreur de lecture')
            }
            this.data = data;
        }) 
        const dataJson = JSON.parse(this.data);
        for(let i = 0; i < dataJson.length; i++){
            if (dataJson[i].username == username){
                this.newUser = dataJson[i]
            }
        }
    return this.newUser;
    }

    getById(id: number): user | null {
        readFile('./src/user/utilisateurJson.json', 'utf8', (err, data) => {
            if (err){
                console.error('erreur de lecture')
            }
            this.data = data;
        }) 
        const dataJson = JSON.parse(this.data);
        for(let i = 0; i < dataJson.length; i++){
            if (dataJson[i].id == id){
                this.newUser = dataJson[i]
            }
        }
    return this.newUser;
    }
}