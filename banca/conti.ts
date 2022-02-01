class SonAccount {
    balanceInit: number;

    constructor(balanceInit: number) {
        this.balanceInit = balanceInit;
    }

    public deposito(ammontare: number): number {      // incrementa l'how much e ci trasferisce la cifra che è stata depositata
        this.balanceInit += ammontare;
        return ammontare;                   //e dimmi di quant'è
    }

    public primoPrelievo(ammontare: number): number {
        this.balanceInit -= ammontare;
        return ammontare;
    }

    public secondoPrelievo(ammontare: number): number {
        this.balanceInit -= ammontare;
        return ammontare;
    }

    public saldo(): number {
        return this.balanceInit;
    }
}



class MotherAccount extends SonAccount {
    constructor(balanceInit: number) {
        super(balanceInit)
    }

    public interessi(tasso: number): number {
        return (this.balanceInit * tasso) / 100;
    }

    public saldo(): number {
        return this.balanceInit + this.interessi(Number($('#interesse').val()));
    }
}

/*let madre = new MotherAccount(1000);
console.log('--- CONTO MADRE ---' + '\n');
console.log(madre);

console.log('Deposito: ' + madre.deposito(400));
console.log('Prelievo 1: ' + madre.primoPrelievo(250));
console.log('Prelievo 2: ' + madre.secondoPrelievo(300));
console.log('Saldo finale: ' + madre.saldo());*/

$(() => {
    let saldoIniziale: number;
    //al click del bottone del saldo dichiari il saldo
    $('#btnSaldo').on('click', function () {
        //recupero i dati dichiarati per il saldo
        saldoIniziale = Number($('#saldoIniziale').val());
        let figlio = new SonAccount(saldoIniziale);
        let madre = new MotherAccount(saldoIniziale);

        //li dichiaro sotto
        if (!saldoIniziale) {
            $('#iniziale').append('Devi inserire un numero valido!');
        } else {
            $('#iniziale').append('Il tuo saldo iniziale è di: ' + saldoIniziale + '€');
        }

        //se i saldo iniziale è maggiore di 1000 euro dò il comando di mostrare il div nascosto, quello degli interessi e faccio partire le altre funzioni per il caso "mother"
        if (saldoIniziale >= 1000) {
            $('#tassoInteresse').removeClass('nascosta');

            $('#btnDeposito').on('click', function () {
                let soldiDepositati: number = Number($('#deposito').val());
                $('#depositato').append('<span class="text-success">Hai depositato</span>: ' + madre.deposito(soldiDepositati) + '€<br>');
                //svuoto il campo dopo il click.
                $('#deposito').val('');
            });

            $('#btnPrelievo').on('click', function () {
                let soldiPrelevati: number = Number($('#prelievo1').val());
                $('#prelevato1').append('<span class="text-danger">Hai prelevato</span>: ' + madre.primoPrelievo(soldiPrelevati) + '€<br>');
                $('#prelievo1').val('');
            });

            $('#btnInteresse').on('click', function () {
                let tassoInteresse: number = Number($('#interesse').val());
                $('#percentuale').append('Il tuo tasso d\'interesse è del ' + tassoInteresse + '%<br>');
                $('#interesse').val('');
            });

            $('#btnSaldoFinale').on('click', function () {
                let saldoFinale: number = madre.saldo();
                $('#attuale').append('Il tuo saldo attuale è di: ' + saldoFinale + ' €');
            });

            //se non è "mother" è "son" quindi procedo con quella condizione.
        } else {
            //funzioni click per figlio.

            $('#btnDeposito').on('click', function () {
                let soldiDepositati: number = Number($('#deposito').val());

                $('#depositato').append('<span class="text-success">Hai depositato</span>: ' + figlio.deposito(soldiDepositati) + '€<br>');
                $('#deposito').val('');

            });

            $('#btnPrelievo').on('click', function () {
                let soldiPrelevati: number = Number($('#prelievo1').val());
                $('#prelevato1').append('<span class="text-danger">Hai prelevato</span>: ' + figlio.primoPrelievo(soldiPrelevati) + '€<br>');
                $('#prelievo1').val('');
            });

            $('#btnSaldoFinale').on('click', function () {
                let saldoFinale: number = figlio.saldo();
                $('#attuale').append('Il tuo saldo attuale è di: ' + saldoFinale + ' €');
                console.log(saldoIniziale);
            });

        }
    });

});
