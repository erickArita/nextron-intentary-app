
import Datastore from 'nedb-promises'
import { join } from 'path'
let databases = new Datastore({ filename: join('inventario.db'), autoload: true, timestampData: true });



export default databases;
