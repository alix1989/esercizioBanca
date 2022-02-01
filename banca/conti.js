var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SonAccount = /** @class */ (function () {
    function SonAccount(balanceInit) {
        this.balanceInit = balanceInit;
    }
    SonAccount.prototype.deposito = function (ammontare) {
        this.balanceInit += ammontare;
        return ammontare; //e dimmi di quant'è
    };
    SonAccount.prototype.primoPrelievo = function (ammontare) {
        this.balanceInit -= ammontare;
        return ammontare;
    };
    SonAccount.prototype.secondoPrelievo = function (ammontare) {
        this.balanceInit -= ammontare;
        return ammontare;
    };
    SonAccount.prototype.saldo = function () {
        return this.balanceInit;
    };
    return SonAccount;
}());
var MotherAccount = /** @class */ (function (_super) {
    __extends(MotherAccount, _super);
    function MotherAccount(balanceInit) {
        return _super.call(this, balanceInit) || this;
    }
    MotherAccount.prototype.interessi = function (tasso) {
        return (this.balanceInit * tasso) / 100;
    };
    MotherAccount.prototype.saldo = function () {
        return this.balanceInit + this.interessi(Number($('#interesse').val()));
    };
    return MotherAccount;
}(SonAccount));
/*let madre = new MotherAccount(1000);
console.log('--- CONTO MADRE ---' + '\n');
console.log(madre);

console.log('Deposito: ' + madre.deposito(400));
console.log('Prelievo 1: ' + madre.primoPrelievo(250));
console.log('Prelievo 2: ' + madre.secondoPrelievo(300));
console.log('Saldo finale: ' + madre.saldo());*/
$(function () {
    var saldoIniziale;
    //al click del bottone del saldo dichiari il saldo
    $('#btnSaldo').on('click', function () {
        //recupero i dati dichiarati per il saldo
        saldoIniziale = Number($('#saldoIniziale').val());
        var figlio = new SonAccount(saldoIniziale);
        var madre = new MotherAccount(saldoIniziale);
        //li dichiaro sotto
        if (!saldoIniziale) {
            $('#iniziale').append('Devi inserire un numero valido!');
        }
        else {
            $('#iniziale').append('Il tuo saldo iniziale è di: ' + saldoIniziale + '€');
        }
        //se i saldo iniziale è maggiore di 1000 euro dò il comando di mostrare il div nascosto, quello degli interessi.
        if (saldoIniziale >= 1000) {
            $('#tassoInteresse').removeClass('nascosta');
            $('#btnDeposito').on('click', function () {
                var soldiDepositati = Number($('#deposito').val());
                $('#depositato').append('<span class="text-success">Hai depositato</span>: ' + madre.deposito(soldiDepositati) + '€<br>');
                $('#deposito').val('');
            });
            $('#btnPrelievo').on('click', function () {
                var soldiPrelevati = Number($('#prelievo1').val());
                $('#prelevato1').append('<span class="text-danger">Hai prelevato</span>: ' + madre.primoPrelievo(soldiPrelevati) + '€<br>');
                $('#prelievo1').val('');
            });
            $('#btnInteresse').on('click', function () {
                var tassoInteresse = Number($('#interesse').val());
                $('#percentuale').append('Il tuo tasso d\'interesse è del ' + tassoInteresse + '%<br>');
                $('#interesse').val('');
            });
            $('#btnSaldoFinale').on('click', function () {
                var saldoFinale = madre.saldo();
                $('#attuale').append('Il tuo saldo attuale è di: ' + saldoFinale + ' €');
            });
        }
        else {
            //funzioni click per figlio.
            $('#btnDeposito').on('click', function () {
                var soldiDepositati = Number($('#deposito').val());
                $('#depositato').append('<span class="text-success">Hai depositato</span>: ' + figlio.deposito(soldiDepositati) + '€<br>');
                $('#deposito').val('');
            });
            $('#btnPrelievo').on('click', function () {
                var soldiPrelevati = Number($('#prelievo1').val());
                $('#prelevato1').append('<span class="text-danger">Hai prelevato</span>: ' + figlio.primoPrelievo(soldiPrelevati) + '€<br>');
                $('#prelievo1').val('');
            });
            $('#btnSaldoFinale').on('click', function () {
                var saldoFinale = figlio.saldo();
                $('#attuale').append('Il tuo saldo attuale è di: ' + saldoFinale + ' €');
                console.log(saldoIniziale);
            });
        }
    });
});
