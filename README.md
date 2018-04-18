# Projekt „Moje dane”
#### Dane
[London Crime Data, 2008-2016](https://www.kaggle.com/jboysen/london-crime/data)
Crime Counts, by Borough, Category, and Month.
Dane te zawierają 13 490 604 rekordów i ograniczyłem je do 4 000 000
```sh
$ head -4000001 london_crime_by_lsoa.csv > london_crime_4m.csv
```
#### Skrypty
Znajdują się folderze [skrypty](https://github.com/nosql/app-cli-jwarzocha/tree/master/skrypty).
#### Wersja mongo
- Linux 64-bit legacy x64
- paczka: mongodb-linux-x86_64-3.6.3

#### Wyniki tabelka
Wyniki w poniższej tabeli były uruchamiane na moim prywatnym sprzęcie, a replica set została stworzona na jednym urządzeniu.

|   | opcje | średni wynik sekundy | średni wynik minuty |
| ------ | ------ | ------ | ------ |
| I | { "w" : 1, "wtimeout" : 0 } | 709 | 11,8 |
| II | { w: 1, j: false } | 688 | 11,5 |
| III | { w: 1, j: true } | 753 | 12,6 |
| IV | { w: 2, j: false } | 553 | 9,2 |
| V | { w: 2, j: true } | 788 | 13,1 |

Jednakże uruchomiłem na ustawieniach domyślnych w sali 109, również replica set na jednym komputerze dla danych o liczbie 1 000 i 1 000 000. Wyniki są w tabelce poniżej.

|   | sala 109 | u mnie |
| ------ | ------ | ------ |
| 1 000 | 2 s | 1 s |
| 1 000 000 | 158 s | 120 s |

#### Spostrzeżenia
Z pierwszej tabelki widać że dwa najlepsze wyniki to kolejno podjeście IV i II. Oba podejścia mają wspólną opcję: 
> j: false

co oznacza, że dane zostają zapisane w pamięci (in memory). Na trzecim miejscu znajuduje się podejście I które ma tą samą opcję dla j tylko nie podaną gdyż jest ona opcją domyślną. Opcja wtimeout jeśli nie jest większa od 1 nie ma wpływu na wynik dlatego wyniki II i I niewiele od siebie odbiegają. 

Podejścia III i V wypadają najgorzej i posiadją opcję:
> j: true

co oznacza że dane będą zapisywane w disk journal(On-disk journal).

Natomiast opcja "w" żąda potwierdzenia, że operacja zapisu została rozpropagowana do określonej liczby instancji mongo. Porównując IV i II wydawałoby się że im wyższy numer tym lepszy czas ale porównując V i II można odnieść inne wrażenie jakby zapis(On-disk journal) miał odwrotny wpływ na czas niż zapis(in memory).

#### Dane
Moje dane tym razem ograniczyłem do 1 000 000.
```sh
$ head -1000001 london_crime_by_lsoa.csv > london_crime_m.csv
```
#### Wyniki tabelka
Wyniki w poniższej tabeli również były uruchamiane na moim prywatnym sprzęcie, a replica set została stworzona na jednym urządzeniu.

| opcje | user | system | time | seconds |  | user | system | time | seconds |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
|  | moje dane |  |  |  |  | pomorskie dane |  |  | 
| { w : 1 wtimeout : 0 } | 18.00 | 1.06 | 0:48.08 | 48 |  | 1.36 | 0.13 | 1:00.62 | 61 | 
|  | 18.18 | 1.17 | 1:26.07 | 86 |  | 1.50 | 0.25 | 1:24.20 | 84 | 
|  | 19.25 | 1.42 | 2:21.16 | 141 |  | 1.41 | 0.12 | 1:05.21 | 65 | 
|  | 18.79 | 1.12 | 1:28.86 | 89 |  | 1.47 | 0.14 | 1:16.54 | 76 | 
|  | 18.79 | 1.12 | 1:28.86 | 89 |  | 1.46 | 0.16 | 1:12.79 | 73 | 
| średnie czasy |  |  |  | 90.6 |  |  |  |  | 71.8 | 
|  |  |  |  |  |  |  |  |  | 
| { w: 1 j: false } | 17.76 | 1.18 | 0:54.11 | 54 |  | 1.41 | 0.15 | 1:04.81 | 65 | 
|  | 18.84 | 1.17 | 2:10.02 | 130 |  | 1.53 | 0.14 | 1:15.97 | 76 | 
|  | 18.04 | 1.12 | 0:58.49 | 58 |  | 1.49 | 0.17 | 1:15.61 | 76 | 
|  | 20.06 | 1.19 | 2:26.98 | 147 |  | 1.56 | 0.22 | 1:28.64 | 89 | 
|  | 18.01 | 1.04 | 0:55.97 | 56 |  | 1.58 | 0.21 | 1:27.82 | 88 | 
| średnie czasy |  |  |  | 89 |  |  |  |  | 78.8 | 
|  |  |  |  |  |  |  |  |  |  | 
| { w: 1 j: true } | 18.34 | 1.11 | 1:27.11 | 87 |  | 1.51 | 0.19 | 1:19.27 | 79 | 
|  | 18.78 | 1.18 | 2:01.84 | 122 |  | 1.43 | 0.18 | 1:12.71 | 73 | 
|  | 18.18 | 1.21 | 1:49.84 | 110 |  | 1.53 | 0.27 | 1:28.22 | 88 | 
|  | 18.10 | 1.30 | 1:32.38 | 92 |  | 1.66 | 0.20 | 1:36.14 | 96 | 
|  | 18.20 | 1.14 | 1:30.37 | 90 |  | 1.52 | 0.18 | 1:20.99 | 82 | 
| średnie czasy |  |  |  | 100.2 |  |  |  |  | 83.6 | 
|  |  |  |  |  |  |  |  |  | 
| { w: 2 j: false } | 18.24 | 1.04 | 1:47.63 | 107 |  | 1.55 | 0.19 | 1:30.69 | 91 | 
|  | 18.40 | 1.13 | 2:45.03 | 165 |  | 1.61 | 0.20 | 1:32.74 | 93 | 
|  | 18.96 | 1.28 | 3:21.35 | 201 |  | 1.37 | 0.15 | 1:03.61 | 64 | 
|  | 18.84 | 1.25 | 2:34.24 | 154 |  | 1.41 | 0.12 | 1:02.07 | 62 | 
|  | 18.48 | 1.13 | 2:00.34 | 121 |  | 1.40 | 0.12 | 1:02.38 | 63 | 
| średnie czasy |  |  |  | 149.6 |  |  |  |  | 74.6 | 
|  |  |  |  |  |  |  |  |  | 
| { w: 2 j: true } | 19.04 | 1.29 | 2:17.12 | 137 |  | 1.36 | 0.17 | 0:57.78 | 58 | 
|  | 19.19 | 1.16 | 2:57.71 | 177 |  | 1.44 | 0.09 | 0:59.23 | 59 | 
|  | 18.44 | 1.35 | 3:39.54 | 219 |  | 1.43 | 0.13 | 1:00.64 | 61 | 
|  | 18.43 | 1.17 | 2:41.18 | 161 |  | 1.35 | 0.17 | 0:56.86 | 57 | 
|  | 18.25 | 1.20 | 2:12.84 | 133 |  | 1.56 | 0.18 | 1:14.56 | 75 | 
| średnie czasy |  |  |  | 165.4 |  |  |  |  | 62 | 


#### Spostrzeżenia
Jedną rzeczą którą zauważyłem jeszcze to, że dla danych województwa pomorskiego opcje:
> { w: 2, j: true }

wypadły teraz najlepiej, może to być spowodowane tym, że dane były spakowane gunzipem lub rozmiar paczki. 

Natomiast dla moich danych opcje:
> { w: 2, j: false }

wypadły już nieco gorzej możliwe że dla mniejszych danych już nie wypadają tak korzystnie.



# Projekt Zaliczenie
Projekt znajduje się w folderze [projekt1(link)](https://github.com/nosql/app-cli-jwarzocha/tree/master/projekt1).
Należy go sklonować w danej lokalizacji:
 - mongodb-linux-x86_64-3.6.3/bin
    
#### Replica Set
Replica set domyślnie ustawiona jest dla jednej maszyny. Żeby to zmienić trzeba zmienić wartości localhost na odpowiednie wartości ip w poniższych plikach:
 - repset.sh
 - variables.js
 - repl_set_init.js

Aby uruchomić należy w lokalizcji mongodb-linux-x86_64-3.6.3/bin/projekt1 uruchomić kolejne polecenia:  
```sh
$ ./repset.sh 1
```
```sh
$ ./repset.sh 2
```
```sh
$ ./repset.sh 3
```
```sh
$ ./repset.sh 4
> rs.initiate(rsconf)
```
```sh
$ ./repset.sh 5
```
#### Dane
Przykładowe dane z 999 rekordów znajdują się w folderze [dane(link)](https://github.com/nosql/app-cli-jwarzocha/tree/master/dane).
#### Skrypty
Znajdują się również w folderze [projekt1(link)](https://github.com/nosql/app-cli-jwarzocha/tree/master/projekt1).
Aby je uruchomić należy najpierw w folderze projekt1 wykonać poniższą komendę:
```sh
$ npm install mongodb
```
#### Opis skryptów i przykładowe wywołania
Skrypt podaje ile rekordów znajduję się w bazie i podaje przykładowy rekord:
```sh
$ node sample_and_record_count.js
```
Skrypt podaje top 10 najczęśćiej występujących przestępstw w danym roku posortowanych po ilośći wystąpień i miesiącu:
```sh
$ node top_10_crimes_by_month.js 2016
```
Skrypt podaje:
 - Top 5 przestępstw w dzielnicach Londynu
 - Top 5 przestępstw w dzielnicach Londynu po kategori przestęsptwa
 - Lata z największą przestępczością
```sh
$ node statistics.js
```
Skrypt wprowadza nowe dane z plików o takiej samej strukturze jak w pliku data.js:
```sh
$ node insert.js ./data.js
```
Skrypt aktualizuje dane wprowadzone poprzednim skryptem:
```sh
$ node update.js
```
Skrypt usuwa dane wprowadzone skrytpem insert.js:
```sh
$ node delete.js
```


