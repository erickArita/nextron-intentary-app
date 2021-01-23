
import Datastore from 'nedb'
import { join} from 'path'
let databases = new Datastore({ filename:join('inventario.db') ,autoload:true});



export default databases;
