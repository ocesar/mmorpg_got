/* importar as configurações do servidor */
const index = require('./config/server');

/* parametrizar a porta de escuta */
index.listen(8080, function(){
	//console.log('Servidor online');
});