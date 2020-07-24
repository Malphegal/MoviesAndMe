export default new class Utils
{
    computeDate(date){
        let splits = date?.split('-');
        if (splits)
            return splits[2] + " " + ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"][splits[1] - 1] + " " + splits[0];
        return "[Aucune date]";
    }

    thousandSeparator(value){
        value = typeof value === "string" ? value : value.toString();
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}()