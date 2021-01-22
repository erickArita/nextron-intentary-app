
import Datastore from 'nedb'

let databases: { inventario: Datastore<any>; usuarios: Datastore<any>; };
databases.inventario = new Datastore({ filename: './inventario.db', autoload: true });
databases.usuarios = new Datastore({ filename: './users', autoload: true })




export default { ...databases };
