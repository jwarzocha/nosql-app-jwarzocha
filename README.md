# Jędrzej Warzocha 215502

## Projekt „Moje dane”
#### Dane
[London Crime Data, 2008-2016](https://www.kaggle.com/jboysen/london-crime/data)
Crime Counts, by Borough, Category, and Month.
Dane te zawierają 13 490 604 rekordów i ograniczyłem je do 4 000 000
```sh
$ head -4000001 london_crime_by_lsoa.csv > london_crime_4m.csv
```
Rozmiar wyniósł 264 MB.

#### Skrypty
Znajdują się folderze [skrypty](https://github.com/nosql/app-cli-jwarzocha/tree/master/skrypty).
#### Wersja mongo
- Linux 64-bit legacy x64
- paczka: mongodb-linux-x86_64-3.6.3

#### Wyniki tabelka
Wyniki w poniższej tabeli były uruchamiane na wirtualnej maszynie(system lubuntu 17.10 z dostępnym jednym rdzeniem procesora), a replica set została stworzona na jednym urządzeniu.

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
Rozmiar wyniósł 66 MB.

#### Wyniki tabelka
Wyniki w poniższej tabeli również były uruchamiane na moim prywatnym sprzęcie, a replica set została stworzona na jednym urządzeniu.
Moje dane były puszczone na wirtualnej maszynie(system lubuntu 17.10 z dostępnym jednym rdzeniem procesora). Natomiast dane pomorskie były puszczone na komputerze(system ubuntu 16.04 z procesorem z czterema rdzeniami).

Wydruki z konsoli można znaleźć [pod tym linkiem](https://github.com/nosql/app-cli-jwarzocha/blob/master/skrypty/notes2.txt).

| opcje | user | system | time(elapsed) | seconds |  | user | system | time(elapsed) | seconds |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
|  | moje dane |  |  |  |  | pomorskie dane |  |  | |
| { w : 1 wtimeout : 0 } |18|1.06| 0:48.08 |48|  |1.36|0.13| 1:00.62 |61| 
|  |18.18|1.17| 1:26.07 |86|  |1.5|0.25| 1:24.20 |84| 
|  |19.25|1.42| 2:21.16 |141|  |1.41|0.12| 1:05.21 |65| 
|  |18.79|1.12| 1:28.86 |89|  |1.47|0.14| 1:16.54 |76| 
|  |18.79|1.12| 1:28.86 |89|  |1.46|0.16| 1:12.79 |73| 
| średnie czasy |18.602|1.178|01:31|90.6|  |1.44|0.16|01:12|71.8| 
|  |  |  |  |  |  |  |  |  | |
| { w: 1 j: false } |17.76|1.18| 0:54.11 |54|  |1.41|0.15| 1:04.81 |65| 
|  |18.84|1.17| 2:10.02 |130|  |1.53|0.14| 1:15.97 |76| 
|  |18.04|1.12| 0:58.49 |58|  |1.49|0.17| 1:15.61 |76| 
|  |20.06|1.19| 2:26.98 |147|  |1.56|0.22| 1:28.64 |89| 
|  |18.01|1.04| 0:55.97 |56|  |1.58|0.21| 1:27.82 |88| 
| średnie czasy |18.542|1.14|01:29|89|  |1.514|0.178|01:19|78.8| 
|  |  |  |  |  |  |  |  |  |  | 
| { w: 1 j: true } |18.34|1.11| 1:27.11 |87|  |1.51|0.19| 1:19.27 |79| 
|  |18.78|1.18| 2:01.84 |122|  |1.43|0.18| 1:12.71 |73| 
|  |18.18|1.21| 1:49.84 |110|  |1.53|0.27| 1:28.22 |88| 
|  |18.1|1.3| 1:32.38 |92|  |1.66|0.2| 1:36.14 |96| 
|  |18.2|1.14| 1:30.37 |90|  |1.52|0.18| 1:20.99 |82| 
| średnie czasy |18.32|1.188|01:40|100.2|  |1.53|0.204|01:24|83.6| 
|  |  |  |  |  |  |  |  |  | |
| { w: 2 j: false } |18.24|1.04| 1:47.63 |107|  |1.55|0.19| 1:30.69 |91| 
|  |18.4|1.13| 2:45.03 |165|  |1.61|0.2| 1:32.74 |93| 
|  |18.96|1.28| 3:21.35 |201|  |1.37|0.15| 1:03.61 |64| 
|  |18.84|1.25| 2:34.24 |154|  |1.41|0.12| 1:02.07 |62| 
|  |18.48|1.13| 2:00.34 |121|  |1.4|0.12| 1:02.38 |63| 
| średnie czasy |18.584|1.166|02:30|149.6|  |1.468|0.156|01:15|74.6| 
|  |  |  |  |  |  |  |  |  | |
| { w: 2 j: true } |19.04|1.29| 2:17.12 |137|  |1.36|0.17| 0:57.78 |58| 
|  |19.19|1.16| 2:57.71 |177|  |1.44|0.09| 0:59.23 |59| 
|  |18.44|1.35| 3:39.54 |219|  |1.43|0.13| 1:00.64 |61| 
|  |18.43|1.17| 2:41.18 |161|  |1.35|0.17| 0:56.86 |57| 
|  |18.25|1.2| 2:12.84 |133|  |1.56|0.18| 1:14.56 |75| 
| średnie czasy |18.67|1.234|02:45|165.4|  |1.428|0.148|01:02|62| 



#### Spostrzeżenia
Jedną rzeczą którą zauważyłem jeszcze to, że dla danych województwa pomorskiego opcje:
> { w: 2, j: true }

wypadły teraz najlepiej, może to być spowodowane tym, że dane były spakowane gunzipem lub rozmiar paczki. 

Natomiast dla moich danych opcje:
> { w: 2, j: false }

wypadły już nieco gorzej możliwe że dla mniejszych danych już nie wypadają tak korzystnie.

/usr/bin/time
```sh
2018-04-13T22:32:07.227+0200	imported 1000000 documents
11.88user 0.41system 2:22.84elapsed 8%CPU (0avgtext+0avgdata 10992maxresident)k
143432inputs+0outputs (41major+1819minor)pagefaults 0swaps
execution time was 143 s.
```
time
```sh
2018-04-13T22:35:26.268+0200	imported 1000000 documents
real	2m16,623s
user	0m11,739s
sys	0m0,341s
execution time was 137 s.
```
Outputy obu komend w szczególności 
 - 11.88user 0.41system 2:22.84elapsed 
 
oraz 
 - real	2m16,623s user	0m11,739s sys	0m0,341s
 
różnią się jedynie notacją czasu. Skoro jedyna różnica dla tych trzech to sposób format w jakim zapisujemy czas to:

• real: The actual time spent in running the process from start to finish, as if it was measured by a human with a stopwatch

• user: The cumulative time spent by all the CPUs during the computation

• sys: The cumulative time spent by all the CPUs during system-related tasks such as memory allocation.

[źródło pod tym linkiem](https://stackoverflow.com/questions/556405/what-do-real-user-and-sys-mean-in-the-output-of-time1) ze stackoverflow(pierwsza odp spod tego linku jest bardziej dokładna)

## Projekt Zaliczenie
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
Skrypt podaje ile rekordów znajduje się w bazie i podaje przykładowy rekord:
```sh
$ node sample_and_record_count.js
```
```sh
			Number of records: 1000000

			Sample record:

{ _id: 5ad7a9d440139fb50cc99d45,
  lsoa_code: 'E01001116',
  borough: 'Croydon',
  major_category: 'Burglary',
  minor_category: 'Burglary in Other Buildings',
  value: 0,
  year: 2016,
  month: 11 }
```
Skrypt podaje top 10 najczęściej występujących przestępstw w danym roku posortowanych po ilości wystąpień i miesiącu:
```sh
$ node top_10_crimes_by_month.js 2016
```
```sh
1)	borough:				Westminster
	major_category:				Theft and Handling
	major_category:				Theft and Handling
	number_occurences_in_month(value):	112
	year:					2016
	month:					February

2)	borough:				Westminster
	major_category:				Theft and Handling
	major_category:				Theft and Handling
	number_occurences_in_month(value):	104
	year:					2016
	month:					May

3)	borough:				Westminster
	major_category:				Theft and Handling
	major_category:				Theft and Handling
	number_occurences_in_month(value):	103
	year:					2016
	month:					September

4)	borough:				Westminster
	major_category:				Theft and Handling
	major_category:				Theft and Handling
	number_occurences_in_month(value):	98
	year:					2016
	month:					August

5)	borough:				Westminster
	major_category:				Theft and Handling
	major_category:				Theft and Handling
	number_occurences_in_month(value):	78
	year:					2016
	month:					September

6)	borough:				Westminster
	major_category:				Theft and Handling
	major_category:				Theft and Handling
	number_occurences_in_month(value):	74
	year:					2016
	month:					February

7)	borough:				Hillingdon
	major_category:				Theft and Handling
	major_category:				Theft and Handling
	number_occurences_in_month(value):	74
	year:					2016
	month:					August

8)	borough:				Newham
	major_category:				Theft and Handling
	major_category:				Theft and Handling
	number_occurences_in_month(value):	65
	year:					2016
	month:					October

9)	borough:				Westminster
	major_category:				Theft and Handling
	major_category:				Theft and Handling
	number_occurences_in_month(value):	64
	year:					2016
	month:					November

10)	borough:				Westminster
	major_category:				Theft and Handling
	major_category:				Theft and Handling
	number_occurences_in_month(value):	63
	year:					2016
	month:					June
```
Skrypt podaje:
 - Top 5 przestępstw w dzielnicach Londynu
 - Top 5 przestępstw w dzielnicach Londynu po kategori przestęsptwa
 - Lata z największą przestępczością
```sh
$ node statistics.js
```
```sh
Top 5 crimes London Districts:
--------------------------------------------------------------------
1) Districts: Westminster
   crimes comitted: 32515

2) Districts: Lambeth
   crimes comitted: 21614

3) Districts: Southwark
   crimes comitted: 20592

4) Districts: Camden
   crimes comitted: 19793

5) Districts: Newham
   crimes comitted: 19755


Top 5 crimes London Districts by categories:
--------------------------------------------------------------------
1) Districts: Westminster
   category: Theft and Handling
   crimes comitted: 19713

2) Districts: Camden
   category: Theft and Handling
   crimes comitted: 10033

3) Districts: Southwark
   category: Theft and Handling
   crimes comitted: 8225

4) Districts: Newham
   category: Theft and Handling
   crimes comitted: 8162

5) Districts: Lambeth
   category: Theft and Handling
   crimes comitted: 8130


Years with the most crimes:
--------------------------------------------------------------------
1) Year: 2012		crimes comitted: 55261
2) Year: 2016		crimes comitted: 54722
3) Year: 2008		crimes comitted: 54220
4) Year: 2015		crimes comitted: 53400
5) Year: 2011		crimes comitted: 52917
6) Year: 2009		crimes comitted: 52304
7) Year: 2010		crimes comitted: 52094
8) Year: 2013		crimes comitted: 51281
9) Year: 2014		crimes comitted: 49363
```
Skrypt wprowadza nowe dane z plików o takiej samej strukturze jak w pliku data.js:
```sh
$ node insert.js ./data.js
```
```sh
insert success

{ '0': '1234a', '1': '1234b' }
```
Skrypt aktualizuje dane wprowadzone poprzednim skryptem:
```sh
$ node update.js
```
```sh
Before update: 

[ { _id: '1234b',
    lsoa_code: 'E01003078',
    borough: 'Lambeth',
    major_category: 'Burglary',
    minor_category: 'Burglary in Other Buildings',
    value: 3,
    year: 2017,
    month: 1 } ]


After update: 

[ { _id: '1234b',
    lsoa_code: 'E01003078',
    borough: 'Lambeth',
    major_category: 'GTA',
    minor_category: 'Grand Theft Auto',
    value: 3,
    year: 2018,
    month: 2 } ]
```
Skrypt usuwa dane wprowadzone skrytpem insert.js:
```sh
$ node delete.js
```
```sh
delete success
```

#### git sizer
```sh
git sizer --verbose
```
Processing blobs: 76                        
Processing trees: 79                        
Processing commits: 45                        
Matching commits to trees: 45                        
Processing annotated tags: 0                        
Processing references: 3 


| Name                         | Value     | Level of concern               |
| ---------------------------- | --------- | ------------------------------ |
| Overall repository size      |           |                                |
| * Commits                    |           |                                |
|   * Count                    |    45     |                                |
|   * Total size               |  16.5 KiB |                                |
| * Trees                      |           |                                |
|   * Count                    |    79     |                                |
|   * Total size               |  11.2 KiB |                                |
|   * Total tree entries       |   322     |                                |
| * Blobs                      |           |                                |
|   * Count                    |    76     |                                |
|   * Total size               |   314 KiB |                                |
| * Annotated tags             |           |                                |
|   * Count                    |     0     |                                |
| * References                 |           |                                |
|   * Count                    |     3     |                                |
|                              |           |                                |
| Biggest objects              |           |                                |
| * Commits                    |           |                                |
|   * Maximum size         [1] |   694 B   |                                |
|   * Maximum parents      [2] |     2     |                                |
| * Trees                      |           |                                |
|   * Maximum entries      [3] |    10     |                                |
| * Blobs                      |           |                                |
|   * Maximum size         [4] |  67.6 KiB |                                |
|                              |           |                                |
| History structure            |           |                                |
| * Maximum history depth      |    43     |                                |
| * Maximum tag depth          |     0     |                                |
|                              |           |                                |
| Biggest checkouts            |           |                                |
| * Number of directories  [5] |     7     |                                |
| * Maximum path depth     [5] |     3     |                                |
| * Maximum path length    [5] |    35 B   |                                |
| * Number of files        [5] |    31     |                                |
| * Total size of files    [5] |   126 KiB |                                |
| * Number of symlinks         |     0     |                                |
| * Number of submodules       |     0     |                                |


[1]  fd117781f6f7ae866896029e4d91cb01257429c9

[2]  f21eb693f97c505f911138e8c10e9da978610744

[3]  b4c1abc21ea028e5cda90b51cbe93afcc4577882 (refs/heads/master:projekt1)

[4]  4cb8e4a5314f74facc0ff251c8dd76e0196b2500 (refs/heads/master:dane/london_crime_test.csv)

[5]  b6bc15056babfba4e440b00d433d1bb61bc7c7b8 (refs/heads/master^{tree})
