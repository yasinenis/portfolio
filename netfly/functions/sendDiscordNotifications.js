// Artık gerekli değil - Discord bildirimleri devre dışı bırakıldı
exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      message: 'Discord bildirimleri devre dışı bırakıldı. Ziyaretçi sayacı yalnızca yerel depolamada çalışmaktadır.' 
    })
  };
}; 