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
        
            let utilisateur = JSON.parse(this.data);
            const Id = this.genererId()
            
            this.newUser = new user(Id, username);
            console.log(this.newUser)
            utilisateur.push(this.newUser);
            
            const addUser = JSON.stringify(utilisateur);

            writeFile('./src/user/utilisateurJson.json', addUser, 'utf8', (err) => {
                if (err) {
                    throw new Error('erreur lors de l\'ecriture du fichier');
                }
            })
        return this.newUser
    }

    genererId() : number {
        return Math.floor(Math.random() * 999999);
    }

    getById(id: number): user | null {
        readFile('./src/user/utilisateurJson.json', 'utf8', (err, data) => {
            if (err){
                console.error('erreur de lecture')
            }
            this.data = data;
            console.log("11111111111111111111111111");
        }) 
        const dataJson = JSON.parse(this.data);
        console.log("2222222222222222222222");
        for(let i = 0; i < dataJson.length; i++){
            if (dataJson[i].id == id){
                this.newUser = dataJson[i]
            }
        }
    return this.newUser;
    }
}